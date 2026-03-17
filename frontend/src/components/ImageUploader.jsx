import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

function ImageUploader({ onUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {'image/*': ['.jpeg', '.jpg', '.png', '.bmp']},
    multiple: false
  });

  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-emerald-500 bg-emerald-900/20' : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? 'text-emerald-400' : 'text-gray-400'}`} />
        {
          isDragActive ?
            <p className="text-emerald-300 font-medium">Drop the image here...</p> :
            <p className="text-gray-300">Drag & drop an image here, or <span className="text-blue-400 font-medium">click to select</span></p>
        }
        <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, BMP</p>
      </div>
      {acceptedFiles.length > 0 && (
         <div className="mt-4 text-sm text-gray-400 flex items-center justify-center">
             <span className="truncate max-w-[200px]">{acceptedFiles[0].name}</span>
             <span className="ml-2 bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
               {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
             </span>
         </div>
      )}
    </div>
  );
}

export default ImageUploader;
