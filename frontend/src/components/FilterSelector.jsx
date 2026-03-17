import React from 'react';
import { Settings, Cpu } from 'lucide-react';

function FilterSelector({ filter, setFilter, useParallel, setUseParallel, numThreads, setNumThreads }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
          <Settings className="w-4 h-4 mr-2 text-blue-400" />
          Select Filter
        </label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        >
          <option value="grayscale">Grayscale</option>
          <option value="blur">Blur (Averaging)</option>
          <option value="edge">Edge Detection (Sobel)</option>
        </select>
      </div>

      <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm font-medium text-gray-300">
            <Cpu className="w-4 h-4 mr-2 text-emerald-400" />
            Parallel Processing (OpenMP)
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={useParallel}
              onChange={(e) => setUseParallel(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className={`transition-opacity duration-200 ${useParallel ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <label className="block text-xs text-gray-400 mb-1">
            Number of Threads: {numThreads}
          </label>
          <input 
            type="range" 
            min="1" 
            max="16" 
            value={numThreads}
            onChange={(e) => setNumThreads(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>4</span>
            <span>8</span>
            <span>16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSelector;
