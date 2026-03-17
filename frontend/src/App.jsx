import React, { useState, useRef } from 'react';
import { processImage } from './api';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './index.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState(null);

  // UI States mapped to backend if possible
  const [activeFilter, setActiveFilter] = useState(''); // 'blur', 'edge', 'grayscale'
  const [useParallel, setUseParallel] = useState(true);
  const [numThreads, setNumThreads] = useState(4);
  const [applyMode, setApplyMode] = useState('one'); // 'all' or 'one'
  const [colorMode, setColorMode] = useState('grayscale'); // 'rgb' or 'gray'

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setProcessedImageUrl(null);
      setMetrics(null);
    }
  };

  const handleApply = async () => {
    if (!imageFile) return;

    // Determine filter: Color Mode 'gray' overrides or works as default
    // If RGB is selected, we use activeFilter ('blur'/'edge'). If no filter, we can't do much yet.
    let backendFilter = colorMode === 'grayscale' ? 'grayscale' : (activeFilter || 'blur');

    setIsProcessing(true);
    try {
      const result = await processImage(imageFile, backendFilter, useParallel, numThreads);
      setProcessedImageUrl(result.processed_image);
      setMetrics({
        timeMs: result.processing_time_ms,
        threadsUsed: result.num_threads_used,
        isParallel: useParallel
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans flex flex-col overflow-y-auto overflow-x-hidden text-sm relative">
      <Header />
      
      <div className="flex flex-col xl:flex-row flex-1 gap-4 p-4 h-full">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full xl:w-1/3 xl:min-w-[350px] xl:max-w-[450px] flex flex-col gap-2 xl:overflow-y-auto xl:pr-2 custom-scrollbar shrink-0">
          
          {/* Top Buttons Row */}
          <div className="flex flex-col gap-2">
            <button 
              className="w-full bg-blue-600 text-white font-bold border border-blue-700 hover:bg-blue-700 py-2 px-4 shadow-sm text-sm transition-colors rounded-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image to Process
            </button>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Nav Row */}
          <div className="px-2 pb-2">
             <div className="flex items-center w-full bg-gray-200 h-1 border border-gray-300"></div>
          </div>

          {/* Radio Options */}
          <div className="grid grid-cols-2 gap-4 ml-2">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input 
                  type="radio" 
                  name="applyMode" 
                  checked={applyMode === 'all'} 
                  onChange={() => setApplyMode('all')} 
                /> Apply to All
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input 
                  type="radio" 
                  name="applyMode" 
                  checked={applyMode === 'one'} 
                  onChange={() => setApplyMode('one')} 
                /> Apply one by one
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input 
                  type="radio" 
                  name="colorMode" 
                  checked={colorMode === 'rgb'} 
                  onChange={() => setColorMode('rgb')} 
                /> RGB
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input 
                  type="radio" 
                  name="colorMode" 
                  checked={colorMode === 'grayscale'} 
                  onChange={() => setColorMode('grayscale')} 
                /> Gray Scale
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Left Column of Panels */}
            <div className="flex-1 flex flex-col gap-2">
              
              {/* Adjust Contrast */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5]">
                 <div className="flex justify-between items-start">
                    <div className="text-[11px] leading-tight font-medium">
                      Adjust Contrast<br/>
                      <span className="text-green-600 font-normal">(alpha &gt; 1 for increase,<br/>0 &lt; alpha &lt; 1 for decrease)</span>
                    </div>
                    <input type="number" defaultValue="0.00" className="w-14 border border-gray-400 px-1 py-0.5 text-xs" step="0.1" />
                 </div>
              </div>

              {/* Adjust Brightness */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5]">
                 <div className="flex justify-between items-start">
                    <div className="text-[11px] leading-tight font-medium">
                      Adjust Brightness<br/>
                      <span className="text-green-600 font-normal">(beta &gt; 0 for increase,<br/>&lt; 0 for decrease)</span>
                    </div>
                    <input type="number" defaultValue="0" className="w-12 border border-gray-400 px-1 py-0.5 text-xs" />
                 </div>
              </div>

              {/* Blurring Image */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5]">
                 <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium">Blurring Image</div>
                 <div className="mt-2 flex">
                    <div className="flex flex-col gap-1 flex-1 border-l-2 border-gray-400 pl-2 ml-1">
                      <label className="flex items-center gap-2 text-[11px]">
                        <input type="radio" name="blurType" onChange={() => setActiveFilter('blur')} /> GAUSSIAN
                      </label>
                      <label className="flex items-center gap-2 text-[11px]">
                        <input type="radio" name="blurType" onChange={() => setActiveFilter('blur')} /> MEDIAN
                      </label>
                      <label className="flex items-center gap-2 text-[11px]">
                        <input type="radio" name="blurType" onChange={() => setActiveFilter('blur')} /> AVERAGE
                      </label>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-20">
                      <span className="text-[10px]">kernel size</span>
                      <input type="number" defaultValue="3" className="w-10 border border-gray-400 px-1 text-xs" />
                      <span className="text-[10px] text-center leading-tight mt-1">standard deviation<br/>(for gaussian only)</span>
                      <input type="number" defaultValue="0.00" className="w-14 border border-gray-400 px-1 text-xs" step="0.1" />
                    </div>
                 </div>
              </div>

              {/* Image Sharpening */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5] mt-2">
                 <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium">Image Sharpening</div>
                 <div className="mt-2 flex justify-between">
                    <label className="flex items-center gap-2 text-[11px] mt-2">
                      <input type="checkbox" /> UNSHARP MASK
                    </label>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px]">kernel size</span>
                      <input type="number" defaultValue="3" className="w-10 border border-gray-400 px-1 text-xs" />
                      <span className="text-[10px] mt-1 mr-4">k</span>
                      <input type="number" defaultValue="1.00" className="w-12 border border-gray-400 px-1 text-xs" step="0.1" />
                    </div>
                 </div>
              </div>

              {/* Morphological Operations */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5] mt-2">
                 <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium">Morphological Operations</div>
                 <div className="mt-2 flex flex-col gap-1 pl-2">
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> EROSION</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> DILATION</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> OPEN</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> CLOSE</label>
                 </div>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px]">kernel size</span>
                    <input type="number" defaultValue="3" className="w-10 border border-gray-400 px-1 text-xs" />
                 </div>
              </div>

            </div>

            {/* Right Column of Panels */}
            <div className="w-full sm:w-[140px] flex flex-col gap-2 pt-[1px] shrink-0">
              
              {/* Add Noise */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5]">
                 <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium">Add Noise</div>
                 <div className="mt-2 flex flex-col gap-2">
                    <div className="flex gap-2">
                       <div className="flex flex-col gap-1 border-l-2 border-gray-400 pl-2">
                          <label className="flex items-center gap-1 text-[10px]"><input type="checkbox" /> SALT</label>
                          <label className="flex items-center gap-1 text-[10px]"><input type="checkbox" /> PEPPER</label>
                          <label className="flex items-center gap-1 text-[10px]"><input type="checkbox" /> GAUSSIAN</label>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-[10px]">quantity</span>
                          <div className="w-6 h-6 rounded-full border border-gray-400 bg-gray-200 mt-1 shadow-inner relative">
                            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gray-400"></div>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-center leading-tight">standard deviation<br/>(for gaussian only)</span>
                      <input type="number" defaultValue="0.00" className="w-14 border border-gray-400 px-1 text-xs mt-1" step="0.1" />
                    </div>
                 </div>
              </div>

              {/* Extra Checkboxes */}
              <div className="flex flex-col gap-1 pl-1 mt-2">
                <label className="flex items-center gap-2 text-[10px]"><input type="checkbox" /> Histogram Equalization</label>
                <label className="flex items-center gap-2 text-[10px]"><input type="checkbox" /> UPSAMPLING</label>
                <label className="flex items-center gap-2 text-[10px]"><input type="checkbox" /> DOWNSAMPLING</label>
              </div>

              {/* Detect Edges */}
              <div className="border border-gray-400 p-2 relative bg-[#f5f5f5] mt-[72px]">
                 <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium">Detect Edges</div>
                 <div className="mt-2 flex flex-col gap-1 pl-2">
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" onChange={() => setActiveFilter('edge')} /> LAPLACIAN</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" onChange={(e) => setActiveFilter(e.target.checked ? 'edge' : '')} /> SOBEL</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> SCHARR</label>
                    <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> MORPHOLOGICAL</label>
                 </div>
                 <div className="flex items-center justify-between gap-1 mt-3">
                    <span className="text-[10px]">kernel size</span>
                    <input type="number" defaultValue="5" className="w-10 border border-gray-400 px-1 text-xs" />
                 </div>
              </div>

            </div>
          </div>

          {/* Parallel Thread config (Custom addition since it's the core assignment!) */}
          <div className="border border-gray-400 p-2 relative bg-[#f5f5f5] mt-2 mb-2">
             <div className="absolute -top-2 left-2 bg-[#f0f0f0] px-1 text-[11px] font-medium text-emerald-700">OpenMP Processing</div>
             <div className="mt-2 flex justify-between items-center px-2">
                <label className="flex items-center gap-2 text-[11px] font-bold">
                  <input type="checkbox" checked={useParallel} onChange={(e) => setUseParallel(e.target.checked)} /> Use Parallel
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px]">Threads</span>
                  <input type="number" value={numThreads} onChange={(e) => setNumThreads(e.target.value)} className="w-12 border border-gray-400 px-1 text-xs" />
                </div>
             </div>
             {metrics && (
                <div className="mt-2 text-center text-[11px] text-gray-600 border-t border-gray-300 pt-1">
                  Processed in <b className="text-emerald-600">{metrics.timeMs.toFixed(2)} ms</b> using {metrics.threadsUsed} thread(s).
                </div>
             )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between px-4 mt-auto pt-2 pb-2">
            <button className="bg-[#e0e0e0] border border-gray-400 hover:bg-gray-300 py-1 px-6 shadow-sm text-xs" onClick={() => {setImageFile(null); setOriginalImageUrl(null); setProcessedImageUrl(null);}}>Clear</button>
            <button className="bg-[#e0e0e0] border border-gray-400 hover:bg-gray-300 py-1 px-6 shadow-sm text-xs">Save</button>
            <button className="bg-[#e0e0e0] border border-gray-400 hover:bg-gray-300 py-1 px-6 shadow-sm text-xs font-bold" onClick={handleApply}>
              {isProcessing ? '...' : 'Apply'}
            </button>
          </div>

        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-4 xl:pl-4 xl:border-l border-gray-300 relative min-h-[600px] xl:min-h-0">
          
          <div className="flex-1 xl:h-[50%] flex flex-col lg:flex-row gap-4 min-h-[300px] xl:min-h-0">
             {/* Original Image Box */}
             <div className="flex-1 bg-white border border-gray-300 flex items-center justify-center p-2 relative min-h-[250px] lg:min-h-0">
               {originalImageUrl ? (
                 <img src={originalImageUrl} alt="Original" className="max-w-full max-h-[400px] xl:max-h-full object-contain" />
               ) : (
                 <span className="text-gray-400 text-xs">Original Image</span>
               )}
             </div>

             {/* Processed Image Box */}
             <div className="flex-1 bg-white border border-gray-300 flex items-center justify-center p-2 relative min-h-[250px] lg:min-h-0">
               {isProcessing ? (
                 <span className="text-emerald-500 text-xs animate-pulse">Processing...</span>
               ) : processedImageUrl ? (
                 <img src={processedImageUrl} alt="Result" className="max-w-full max-h-[400px] xl:max-h-full object-contain" />
               ) : (
                 <span className="text-gray-400 text-xs">Processed</span>
               )}
             </div>
          </div>

          <div className="flex-1 xl:h-[50%] flex flex-col lg:flex-row gap-4 min-h-[200px] xl:min-h-0 pb-12 xl:pb-0">
             {/* Left Graph (Histogram Dummy) */}
             <div className="flex-1 bg-white border border-gray-300 flex items-end justify-start p-2 relative overflow-hidden">
               {originalImageUrl && (
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-black stroke-current stroke-1 fill-none">
                     <path d="M0,100 L0,40 L2,80 L5,90 L20,95 L40,95 L50,85 L60,80 L70,60 L80,30 L90,60 L100,100" />
                  </svg>
               )}
             </div>

             {/* Right Graph (Histogram Dummy) */}
             <div className="flex-1 bg-white border border-gray-300 flex items-end justify-start p-2 relative overflow-hidden">
               {processedImageUrl && (
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-black stroke-current stroke-1 fill-none">
                     <path d="M0,100 L0,30 L5,85 L20,95 L40,95 L60,85 L70,50 L80,20 L90,65 L100,100" />
                  </svg>
               )}
             </div>
          </div>

          <div className="absolute -bottom-2 right-0 pr-4 pb-2">
            <button className="bg-[#e0e0e0] border border-gray-400 hover:bg-gray-300 py-1 px-8 shadow-sm text-xs">Back</button>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default App;
