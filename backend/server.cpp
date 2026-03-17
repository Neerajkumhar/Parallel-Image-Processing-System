#ifdef _WIN32
#define _WIN32_WINNT 0x0A00
#endif
#include "httplib.h"
#include "image_processor.h"
#include <iostream>

void start_server(int port) {
    httplib::Server svr;

    // CORS preflight and headers
    svr.Options("/(.*)", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type, Accept");
        res.status = 200;
    });

    svr.set_pre_routing_handler([](const auto& req, auto& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type, Accept");
        return httplib::Server::HandlerResponse::Unhandled;
    });

    svr.Post("/process-image", [](const httplib::Request& req, httplib::Response& res) {
        if (!req.form.has_file("image")) {
            res.set_content("{\"error\": \"No image file provided\"}", "application/json");
            res.status = 400;
            return;
        }

        const auto& file = req.form.get_file("image");
        
        std::string filter = "grayscale";
        if (req.form.has_field("filter")) filter = req.form.get_field("filter");
        else if (req.form.has_file("filter")) filter = req.form.get_file("filter").content;
        
        bool use_parallel = true;
        if (req.form.has_field("use_parallel")) {
            use_parallel = req.form.get_field("use_parallel") == "true";
        } else if (req.form.has_file("use_parallel")) {
            use_parallel = req.form.get_file("use_parallel").content == "true";
        }

        int num_threads = 4;
        std::string threads_str;
        if (req.form.has_field("num_threads")) {
            threads_str = req.form.get_field("num_threads");
        } else if (req.form.has_file("num_threads")) {
            threads_str = req.form.get_file("num_threads").content;
        }
        if (!threads_str.empty()) {
            try { num_threads = std::stoi(threads_str); } catch (...) {}
        }

        std::string image_data = file.content;
        std::cout << "Received image, size: " << image_data.size() << " bytes." << std::endl;
        std::cout << "Filter: " << filter << ", Parallel: " << (use_parallel ? "Yes" : "No") << ", Threads: " << num_threads << std::endl;

        ProcessResult result = ImageProcessor::process(image_data, filter, use_parallel, num_threads);

        if (result.processed_image_base64.empty()) {
            res.set_content("{\"error\": \"Failed to process image\"}", "application/json");
            res.status = 500;
            return;
        }

        std::string response = "{\"processed_image\": \"data:image/png;base64," + result.processed_image_base64 + "\", " +
                               "\"processing_time_ms\": " + std::to_string(result.processing_time_ms) + ", " +
                               "\"num_threads_used\": " + std::to_string(result.num_threads_used) + "}";

        res.set_content(response, "application/json");
    });

    std::cout << "Starting server on port " << port << "..." << std::endl;
    svr.listen("0.0.0.0", port);
}
