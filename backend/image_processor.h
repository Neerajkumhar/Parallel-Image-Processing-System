#ifndef IMAGE_PROCESSOR_H
#define IMAGE_PROCESSOR_H

#include <string>
#include <vector>

struct ProcessResult {
    std::string processed_image_base64;
    double processing_time_ms;
    int num_threads_used;
    std::string format;
};

class ImageProcessor {
public:
    // Process image and return the base64 encoded result and metadata
    static ProcessResult process(const std::string& image_data, const std::string& filter_type, bool use_parallel, int num_threads);
};

#endif // IMAGE_PROCESSOR_H
