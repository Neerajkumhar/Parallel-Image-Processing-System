#include "image_processor.h"
#include <opencv2/opencv.hpp>
#include <omp.h>
#include <chrono>
#include <iostream>
#include <vector>
#include <cmath>

std::string base64_encode(const std::vector<uchar>& buffer) {
    static const char lookup[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    std::string out;
    out.reserve((buffer.size() + 2) / 3 * 4);
    int val = 0, valb = -6;
    for (uchar c : buffer) {
        val = (val << 8) + c;
        valb += 8;
        while (valb >= 0) {
            out.push_back(lookup[(val >> valb) & 0x3F]);
            valb -= 6;
        }
    }
    if (valb > -6) out.push_back(lookup[((val << 8) >> (valb + 8)) & 0x3F]);
    while (out.size() % 4) out.push_back('=');
    return out;
}

ProcessResult ImageProcessor::process(const std::string& image_data, const std::string& filter_type, bool use_parallel, int num_threads) {
    ProcessResult result;
    result.format = "png";

    std::vector<uchar> decode_buffer(image_data.begin(), image_data.end());
    cv::Mat img = cv::imdecode(decode_buffer, cv::IMREAD_COLOR);
    if (img.empty()) {
        std::cerr << "Failed to decode image!" << std::endl;
        return result;
    }

    cv::Mat out_img = img.clone();

    if (use_parallel && num_threads > 0) {
        omp_set_num_threads(num_threads);
        result.num_threads_used = num_threads;
    } else {
        omp_set_num_threads(1);
        result.num_threads_used = 1;
        use_parallel = false;
    }

    auto start_time = std::chrono::high_resolution_clock::now();

    if (filter_type == "grayscale") {
        int rows = img.rows;
        int cols = img.cols;
        #pragma omp parallel for if(use_parallel)
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                cv::Vec3b pixel = img.at<cv::Vec3b>(r, c);
                uchar gray = static_cast<uchar>(0.299 * pixel[2] + 0.587 * pixel[1] + 0.114 * pixel[0]);
                out_img.at<cv::Vec3b>(r, c) = cv::Vec3b(gray, gray, gray);
            }
        }
    } else if (filter_type == "blur") {
        int rows = img.rows;
        int cols = img.cols;
        int ksize = 5; // using 5x5 blur for visibility
        int khalf = ksize / 2;

        #pragma omp parallel for if(use_parallel)
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                int b = 0, g = 0, red = 0;
                int count = 0;
                for (int kr = -khalf; kr <= khalf; ++kr) {
                    for (int kc = -khalf; kc <= khalf; ++kc) {
                        int nr = r + kr;
                        int nc = c + kc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            cv::Vec3b p = img.at<cv::Vec3b>(nr, nc);
                            b += p[0]; g += p[1]; red += p[2];
                            count++;
                        }
                    }
                }
                out_img.at<cv::Vec3b>(r, c) = cv::Vec3b(b/count, g/count, red/count);
            }
        }
    } else if (filter_type == "edge") {
        cv::Mat gray(img.rows, img.cols, CV_8UC1);
        int rows = img.rows;
        int cols = img.cols;
        
        #pragma omp parallel for if(use_parallel)
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                cv::Vec3b pixel = img.at<cv::Vec3b>(r, c);
                gray.at<uchar>(r, c) = static_cast<uchar>(0.299 * pixel[2] + 0.587 * pixel[1] + 0.114 * pixel[0]);
            }
        }

        #pragma omp parallel for if(use_parallel)
        for (int r = 1; r < rows - 1; ++r) {
            for (int c = 1; c < cols - 1; ++c) {
                int gx = -gray.at<uchar>(r - 1, c - 1) + gray.at<uchar>(r - 1, c + 1)
                         - 2 * gray.at<uchar>(r, c - 1) + 2 * gray.at<uchar>(r, c + 1)
                         - gray.at<uchar>(r + 1, c - 1) + gray.at<uchar>(r + 1, c + 1);

                int gy = gray.at<uchar>(r - 1, c - 1) + 2 * gray.at<uchar>(r - 1, c) + gray.at<uchar>(r - 1, c + 1)
                         - gray.at<uchar>(r + 1, c - 1) - 2 * gray.at<uchar>(r + 1, c) - gray.at<uchar>(r + 1, c + 1);

                int sum = std::abs(gx) + std::abs(gy);
                uchar val = sum > 255 ? 255 : sum;
                out_img.at<cv::Vec3b>(r, c) = cv::Vec3b(val, val, val);
            }
        }
        
        // Handle borders safely
        #pragma omp parallel for if(use_parallel)
        for (int r = 0; r < rows; ++r) {
            out_img.at<cv::Vec3b>(r, 0) = cv::Vec3b(0, 0, 0);
            out_img.at<cv::Vec3b>(r, cols - 1) = cv::Vec3b(0, 0, 0);
        }
        #pragma omp parallel for if(use_parallel)
        for (int c = 0; c < cols; ++c) {
            out_img.at<cv::Vec3b>(0, c) = cv::Vec3b(0, 0, 0);
            out_img.at<cv::Vec3b>(rows - 1, c) = cv::Vec3b(0, 0, 0);
        }
    }

    auto end_time = std::chrono::high_resolution_clock::now();
    result.processing_time_ms = std::chrono::duration<double, std::milli>(end_time - start_time).count();

    std::vector<uchar> encode_buffer;
    cv::imencode(".png", out_img, encode_buffer);
    result.processed_image_base64 = base64_encode(encode_buffer);

    return result;
}
