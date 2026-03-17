import React from 'react';
import { Download, Loader2 } from 'lucide-react';

function ImageComparison({ originalUrl, processedUrl, isProcessing }) {
  if (!originalUrl) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-700/50 rounded-xl h-full min-h-[400px]">
        <p>Upload an image to see the comparison</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Original Image */}
        <div className="flex flex-col items-center justify-start bg-gray-900/40 p-3 rounded-xl border border-gray-700">
          <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full mb-3 shadow">Original</span>
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-lg bg-black box-border min-h-[250px] shadow-inner">
             <img src={originalUrl} alt="Original" className="max-w-full max-h-[400px] object-contain" />
          </div>
        </div>

        {/* Processed Image */}
        <div className="flex flex-col items-center justify-start bg-gray-900/40 p-3 rounded-xl border border-gray-700 relative overflow-hidden">
          <span className="bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full mb-3 shadow z-10 flex items-center">
            {isProcessing && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
            {isProcessing ? 'Processing...' : 'Processed'}
          </span>
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-lg bg-black box-border min-h-[250px] shadow-inner">
            {isProcessing ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm z-20">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-emerald-400 mt-4 text-sm font-medium animate-pulse">Running OpenMP Tasks...</p>
              </div>
            ) : processedUrl ? (
              <img src={processedUrl} alt="Processed" className="max-w-full max-h-[400px] object-contain" />
            ) : (
              <p className="text-gray-600 text-sm">Processing result will appear here</p>
            )}
          </div>
        </div>
      </div>

      {processedUrl && !isProcessing && (
        <div className="flex justify-center mt-2">
          <a
            href={processedUrl}
            download="processed_image.png"
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg border border-gray-600"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Processed Image</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageComparison;
