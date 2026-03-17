# Parallel Image Processing System 🚀

A high-performance image processing application built with a **C++/OpenMP** backend and a **React** frontend. This project demonstrates thread-level parallelism for digital image processing as part of the **Distributed Algorithms / Hadoop Lab**.

---

## 🌐 Live URLs
- **Frontend (Vercel):** [https://parallel-image-processing-system.vercel.app/](https://parallel-image-processing-system.vercel.app/)
- **Backend (Render):** [https://parallel-image-processing-system.onrender.com](https://parallel-image-processing-system.onrender.com)

---

## 🏛️ System Architecture

The system follows a **Client-Server Architecture** communicating over a RESTful API.

### 1. Backend (C++/OpenMP)
- **High Performance**: Native C++ handles heavy matrix computations.
- **Parallel Computing**: Uses **OpenMP** to distribute pixel-row processing across multiple CPU cores.
- **REST API**: A lightweight HTTP server (`cpp-httplib`) receives image data and returns processed results.
- **Image Intelligence**: Uses **OpenCV** for robust image decoding, encoding, and matrix manipulation.

### 2. Frontend (React/Vite)
- **Responsive UI**: Built with **Tailwind CSS**, mimicking a desktop-class application.
- **Interactive Controls**: Users can toggle parallel execution, set thread counts, and select filters.
- **Real-time Feedback**: Displays processing metrics (execution time in milliseconds and threads used) directly from the backend.

---

## 🛠️ Tech Stack & Libraries

### **Frontend**
- **React.js**: Library for building the dynamic user interface.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive styling.
- **Axios**: For handling multipart/form-data requests to the C++ server.
- **Lucide React**: For sleek, professional iconography.

### **Backend**
- **C++ 17**: Core language for computational logic.
- **OpenMP**: API for multi-platform shared-memory parallel programming.
- **OpenCV**: Open Source Computer Vision Library for advanced image matrix operations.
- **cpp-httplib**: A header-only C++ library for HTTP/HTTPS server implementation.
- **CMake**: Build automation system.

---

## ⚙️ Core Functionality

### 🟢 Parallelized Filters
1.  **Grayscale Conversion**: Converts RGB images to grayscale using weighted luminance. Each row is processed in parallel using `#pragma omp parallel for`.
2.  **Mean Blur (Box Filter)**: Applies a spatial smoothing effect. The workload is distributed across cores to handle large kernel convolutions efficiently.
3.  **Sobel Edge Detection**: Calculates horizontal and vertical gradients to identify edges. Parallelism significantly reduces the time taken for gradient calculations.
4.  **Morphological Operations**: Includes **Erosion**, **Dilation**, **Opening**, and **Closing**. These use structural elements to shape and process binary or grayscale images, with the computations parallelized over pixel neighborhoods.

### 📊 Performance Monitoring
- The system captures the start and end ticks using `omp_get_wtime()`.
- It returns the precise duration and the actual number of threads utilized by the CPU to the frontend.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js & npm** (for Frontend)
- **MinGW64 (MSYS2)** with `g++`, `cmake`, and `opencv` (for Backend)

### 1. Run the Backend
```bash
cd backend
# Build using CMake (on Windows/MSYS2)
mkdir build && cd build
cmake -G "MinGW Makefiles" ..
make
# Run the server
./server.exe
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📜 Development Report Summary
This project successfully bridges the gap between low-level performance and high-level user experience. By utilizing **OpenMP**, we achieve near-linear speedup on multicore processors, making processed image feedback nearly instantaneous even for large files. It serves as a practical implementation of shared-memory parallel concepts explored in the Distributed Algorithms curriculum.

**Developer:** Neeraj Kumhar  
**Portfolio:** [neerajkumhar.space](https://neerajkumhar.space)
