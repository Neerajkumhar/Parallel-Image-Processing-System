import React from 'react';
import Header from './components/Header';

function About() {
  const developerName = "Neeraj Kumhar";
  const profileImageUrl = "https://media.licdn.com/dms/image/v2/D5603AQG24RHbssW8dA/profile-displayphoto-scale_200_200/B56ZzghdF9JwAg-/0/1773293415453?e=1775088000&v=beta&t=hQSZvLWSCoIPDOOgFCx4-vuMHMP8AiCk7FvPZNsa6k0"; // LinkedIn profile photo

  return (
    <div className="min-h-screen bg-white text-black font-serif flex flex-col overflow-y-auto overflow-x-hidden">
      <Header />
      
      {/* Wikipedia Style Layout Container */}
      <div className="max-w-[1200px] mx-auto w-full px-6 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Main Article Content */}
        <div className="flex-1 order-2 md:order-1">
          <h1 className="text-3xl font-serif border-b border-gray-300 pb-1 mb-1">{developerName}</h1>
          <div className="text-xs text-gray-600 mb-6 italic">From <a href="https://www.linkedin.com/in/neeraj-kumhar/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>, Full-Stack Engineer & High-Performance Computing Architect</div>

          <p className="mb-4 leading-relaxed text-[14px]">
            <strong>{developerName}</strong> is an Indian software engineer and high-performance computing architect based in Jodhpur, Rajasthan. 
            He is the principal architect of the <strong>Parallel Image Processing System</strong>, which demonstrates advanced 
            shared-memory parallelism combining <strong>C++ (OpenMP)</strong> with modern <strong>React</strong> interfaces.
          </p>

          <p className="mb-6 leading-relaxed text-[14px]">
            Known for his focus on performance optimization, Kumhar has successfully built and deployed numerous industrial-grade 
            web applications, focusing on reducing application bundle sizes and modernizing tech stacks with <strong>TypeScript</strong> and <strong>Vite</strong>. 
            His technical philosophy emphasizes building scalable enterprise infrastructure using the <strong>PostgreSQL-Node-React</strong> stack.
          </p>

          {/* Table of Contents - Wikipedia Style */}
          <div className="bg-[#f8f9fa] border border-[#a2a9b1] p-2 inline-block mb-8 min-w-[200px]">
            <div className="text-center font-bold text-sm mb-2">Contents</div>
            <ul className="text-[13px] space-y-1 text-blue-700 list-decimal list-inside px-2">
              <li className="hover:underline cursor-pointer">Education</li>
              <li className="hover:underline cursor-pointer">Career</li>
              <li className="hover:underline cursor-pointer">Technical expertise</li>
              <li className="hover:underline cursor-pointer">Notable projects</li>
              <li className="hover:underline cursor-pointer">See also</li>
            </ul>
          </div>

          <h2 className="text-2xl font-serif border-b border-gray-300 pb-1 mt-8 mb-4">Education</h2>
          <p className="text-[14px] leading-relaxed mb-4">
            Kumhar holds a <strong>Bachelor of Technology (B.Tech) in Computer Science</strong> from the <strong>JIET Group of Institutions</strong>, Jodhpur. 
            His academic background provided the foundation for his research into distributed algorithms and high-performance threading models.
          </p>

          <h2 className="text-2xl font-serif border-b border-gray-300 pb-1 mt-8 mb-4">Professional activities</h2>
          <p className="text-[14px] leading-relaxed mb-4">
            Starting his professional journey in 2022, Kumhar has worked as a full-stack developer, contributing to various startups 
            and enterprise projects. His work has involved massive HR and payroll automation, specifically building dashboards 
            capable of processing high-volume data and automated reporting.
          </p>

          <h2 className="text-2xl font-serif border-b border-gray-300 pb-1 mt-8 mb-4">Technical expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            <div>
              <h3 className="font-bold mb-1">Frontend</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>React / Next.js / Vue.js</li>
                <li>TypeScript & Tailwind CSS</li>
                <li>Vite & Webpack</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">Backend & DevOps</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Node.js / Express / Django</li>
                <li>PostgreSQL / MongoDB / Redis</li>
                <li>AWS / Docker / CI/CD</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-serif border-b border-gray-300 pb-1 mt-8 mb-4">Notable projects</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
               <h4 className="font-bold text-gray-800">TaskFlow</h4>
               <p className="text-[13px] text-gray-600">A professional task management app using WebSockets for real-time live updates, drag-and-drop mechanics, and RBAC security.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
               <h4 className="font-bold text-gray-800">Employee Management System</h4>
               <p className="text-[13px] text-gray-600">Automated payroll and HR dashboard featuring high-speed PDF generation and PostgreSQL scaling.</p>
            </div>
          </div>

          <div className="mt-12 pt-4 border-t border-gray-300 text-center">
             <button 
                onClick={() => window.history.back()}
                className="bg-[#f8f9fa] border border-[#a2a9b1] hover:bg-gray-100 py-1 px-6 text-xs font-sans transition-colors"
              >
                Return to Application
              </button>
          </div>
        </div>

        {/* Right Column: Wikipedia InfoBox */}
        <div className="w-full md:w-[300px] shrink-0 order-1 md:order-2">
          <table className="border border-[#a2a9b1] bg-[#f8f9fa] w-full text-[12px] border-collapse shadow-sm">
            <thead>
              <tr>
                <th colSpan="2" className="bg-[#eaecf0] py-2 text-[16px] font-bold border-b border-[#a2a9b1]">
                  {developerName}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="p-4 border-b border-[#a2a9b1] bg-white text-center">
                  <div className="inline-block border border-[#a2a9b1] p-1 shadow-sm">
                    <img 
                      src={profileImageUrl} 
                      alt="Neeraj Kumhar Portfolio" 
                      className="w-full h-auto max-w-[220px] filter saturate-[0.8]"
                    />
                  </div>
                  <div className="text-center text-[11px] mt-2 text-gray-600 italic">
                    Software Developer & Architect
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-2 border-b border-[#a2a9b1] text-left align-top leading-tight w-1/3">Native name</th>
                <td className="p-2 border-b border-[#a2a9b1] leading-tight">नीरज कुम्हार</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-[#a2a9b1] text-left align-top leading-tight">Education</th>
                <td className="p-2 border-b border-[#a2a9b1] leading-tight">
                  JIET Jodhpur (B.Tech CSE)
                </td>
              </tr>
              <tr>
                <th className="p-2 border-b border-[#a2a9b1] text-left align-top leading-tight">Known for</th>
                <td className="p-2 border-b border-[#a2a9b1] leading-tight italic">
                  Full-stack engineering, performance scaling, Parallel systems
                </td>
              </tr>
              <tr>
                <th className="p-2 border-b border-[#a2a9b1] text-left align-top leading-tight">Notable work</th>
                <td className="p-2 border-b border-[#a2a9b1] leading-tight">
                  Parallel Image Processing System, TaskFlow, Vagwiin EMS
                </td>
              </tr>
              <tr>
                <th className="p-2 border-b border-[#a2a9b1] text-left align-top leading-tight">Website</th>
                <td className="p-2 border-b border-[#a2a9b1] leading-tight">
                  <div className="flex flex-col gap-2 font-sans">
                    <a href="https://neerajkumhar.space" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">neerajkumhar.space</a>
                    <a 
                      href="/report.pdf" 
                      download="Parallel_Processing_Report.pdf"
                      className="inline-flex items-center gap-1 w-fit text-emerald-700 font-bold hover:underline bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-sm text-[10px]"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download Report PDF
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <th colSpan="2" className="bg-[#eaecf0] py-1 text-center font-bold border-b border-[#a2a9b1] uppercase text-[10px] tracking-wide">
                  Technical Signature
                </th>
              </tr>
              <tr>
                <td colSpan="2" className="py-6 text-center bg-white">
                   <div className="font-serif text-3xl opacity-80 select-none tracking-tighter" style={{ fontFamily: "'Dancing Script', 'Cursive', serif", transform: "rotate(-3deg)" }}>
                      Neeraj Kumhar
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-4 p-3 border border-[#c8ccd1] text-[11px] bg-white italic leading-tight">
             "Committed to building scalable and sustainable web ecosystems."
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
