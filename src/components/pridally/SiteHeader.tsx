'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface SiteHeaderProps {
  onGetStarted: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <img
              src="/Pridally_logo.png"
              alt="Pridally"
              className="h-[138px] w-auto mx-auto brightness-130"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
            <span className="text-4xl font-bold text-black mb-8 block" style={{ display: 'none' }}>Pridally</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-black/90 hover:text-black transition-colors">
              Home
            </a>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                className="flex items-center text-black/90 hover:text-black transition-colors"
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openDropdown === 'solutions' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-md shadow-lg py-2 z-10">
                  <a href="/solution_individual" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    For Individuals
                  </a>
                  <a href="/solution_nhs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    For NHS/Services
                  </a>
                  <a href="/solution_uni" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    For Universities/Research
                  </a>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center text-black/90 hover:text-black transition-colors"
              >
                About Us
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-md shadow-lg py-2 z-10">
                  <a href="/why_pridally" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Why Pridally
                  </a>
                  <a href="/safeguarding" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Safeguarding &amp; Clinical Standards
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => window.location.href = '/press'}
              className="text-black/90 hover:text-black transition-colors"
            >
              Media
            </button>

            <a href="/future_scope" className="text-black/90 hover:text-black transition-colors">
              Future Scope
            </a>

            <button
              onClick={onGetStarted}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-orange-400 transition-colors shadow-md hover:shadow-lg"
            >
              Join Pridally
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="space-y-4">
              <a href="/" className="block text-gray-700 hover:text-gray-900">
                Home
              </a>

              <a href="/future_scope" className="block text-gray-700 hover:text-gray-900">
                Future Scope
              </a>

              <button
                onClick={onGetStarted}
                className="block w-full text-left bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-orange-400 transition-colors"
              >
                Join Pridally
              </button>

              {/* Mobile Solutions */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-solutions')}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900"
                >
                  Solutions
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === 'mobile-solutions' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="/solution_individual" className="block text-gray-600 hover:text-gray-900">
                      For Individuals
                    </a>
                    <a href="/solution_nhs" className="block text-gray-600 hover:text-gray-900">
                      For NHS/Services
                    </a>
                    <a href="/solution_uni" className="block text-gray-600 hover:text-gray-900">
                      For Universities/Research
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile About Us */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-about')}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900"
                >
                  About Us
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === 'mobile-about' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="/why_pridally" className="block text-gray-600 hover:text-gray-900">
                      Why Pridally
                    </a>
                    <a href="/safeguarding" className="block text-gray-600 hover:text-gray-900">
                      Safeguarding &amp; Clinical Standards
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteHeader;
