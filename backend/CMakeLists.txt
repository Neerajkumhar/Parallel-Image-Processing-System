cmake_minimum_required(VERSION 3.10)
project(ParallelImageProcessing)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find OpenCV
find_package(OpenCV REQUIRED)

# Find OpenMP
find_package(OpenMP REQUIRED)

add_executable(server main.cpp server.cpp image_processor.cpp)

# Link OpenCV
target_include_directories(server PRIVATE ${OpenCV_INCLUDE_DIRS})
target_link_libraries(server PRIVATE ${OpenCV_LIBS})

# Link OpenMP
if(OpenMP_CXX_FOUND)
    target_link_libraries(server PUBLIC OpenMP::OpenMP_CXX)
endif()

# Since we're using cpp-httplib, we need the following thread libs
find_package(Threads REQUIRED)
target_link_libraries(server PRIVATE Threads::Threads)

if(WIN32)
    # Required for Windows sockets used by cpp-httplib
    target_link_libraries(server PRIVATE wsock32 ws2_32)
endif()
