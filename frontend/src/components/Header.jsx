import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md border-b border-blue-800 shrink-0 relative z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-3 px-6">
        <h1 className="text-lg md:text-xl font-bold tracking-tight truncate mr-4">
          Parallel Image Processing System
        </h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-blue-100">
            <span>Distributed Algorithms / Hadoop Lab</span>
            <span className="bg-blue-600/50 px-2 py-0.5 rounded border border-blue-400/30">OpenMP + C++ Backend</span>
          </div>
          <nav className="flex items-center gap-4 border-l border-blue-400/30 pl-4">
            <Link to="/" className="text-xs font-bold hover:text-blue-200 transition-colors uppercase tracking-widest">Home</Link>
            <Link to="/about" className="text-xs font-bold hover:text-blue-200 transition-colors uppercase tracking-widest">About</Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-1 hover:bg-blue-600 rounded transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-4">
            <Link 
              to="/" 
              className="text-sm font-bold hover:text-blue-200 transition-colors uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-bold hover:text-blue-200 transition-colors uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-blue-700 text-[10px] text-blue-100">
              <span>Distributed Algorithms / Hadoop Lab</span>
              <span className="w-fit bg-blue-600/50 px-2 py-0.5 rounded border border-blue-400/30">OpenMP + C++ Backend</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
