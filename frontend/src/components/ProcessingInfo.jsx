import React from 'react';
import { Clock, Cpu, Zap } from 'lucide-react';

function ProcessingInfo({ metrics }) {
  if (!metrics) return null;

  const { timeMs, threadsUsed, isParallel } = metrics;
  
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
      
      <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
        <Zap className="w-5 h-5 text-yellow-400 mr-2" />
        Performance Metrics
      </h3>
      
      <div className="space-y-4 relative z-10">
        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700/50 flex items-start justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Execution Time</p>
              <p className="text-2xl font-bold font-mono text-gray-100">{timeMs.toFixed(2)}<span className="text-sm text-gray-500 ml-1">ms</span></p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700/50 flex items-start justify-between">
          <div className="flex items-center">
            <Cpu className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Processing Mode</p>
              <div className="flex items-baseline mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${isParallel ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-900/50 text-yellow-500 border border-yellow-500/30'}`}>
                  {isParallel ? 'PARALLEL' : 'SEQUENTIAL'}
                </span>
                <span className="text-sm font-medium text-gray-300 shadow bg-gray-900 px-2 py-0.5 rounded border border-gray-700">
                  {threadsUsed} Thread{threadsUsed > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessingInfo;
