#include <iostream>
#include <string>

// Forward declaration from server.cpp
void start_server(int port);

int main(int argc, char** argv) {
    int port = 8080;
    if (argc > 1) {
        try {
            port = std::stoi(argv[1]);
        } catch (...) {
            std::cerr << "Invalid port number. Utilizing default (8080)." << std::endl;
        }
    }

    std::cout << "Starting Parallel Image Processing System Backend..." << std::endl;
    start_server(port);
    
    return 0;
}
