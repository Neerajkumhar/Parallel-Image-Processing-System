# Use an official Ubuntu-based build environment
FROM ubuntu:22.04

# Avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install build tools, CMake, OpenCV, and OpenMP
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopencv-dev \
    libomp-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory for the application
WORKDIR /app

# Copy all files from the backend directory (assuming this is the build context)
COPY . .

# Create a build directory and compile
RUN mkdir -p build && \
    cd build && \
    cmake .. && \
    make

# The server listens on the port assigned by Render (defaulting to 8080 if not set)
EXPOSE 8080

# Run the compiled server executable
CMD ["./build/server"]
