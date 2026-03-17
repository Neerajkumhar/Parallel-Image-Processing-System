import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const processImage = async (imageFile, filter, useParallel, numThreads) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('filter', filter);
    formData.append('use_parallel', useParallel);
    formData.append('num_threads', numThreads);

    const response = await api.post('/process-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};
