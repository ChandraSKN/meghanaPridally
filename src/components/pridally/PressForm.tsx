import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface PressPageProps {
  onGetStarted: () => void;
}

const pressItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2071&auto=format&fit=crop",
    date: "October 20, 2025",
    category: "Research News",
    title: "Dr. Meghana Rao Nadendla on BBC Radio Manchester for Clinical Research",
    excerpt: "On October 19, 2025, Pridally's founder Dr. Meghana Rao Nadendla joined BBC Radio Manchester with presenter Simone Riley for an inspiring conversation about health disparities in Black communities and how clinical research..."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop",
    date: "September 10, 2025",
    category: "Research News",
    title: "Why Knowing Your Genotype is Important for Sickle Cell Disease",
    excerpt: "Did you know that 300 million people worldwide carry the sickle cell trait? Understanding your genotype is crucial for family planning and managing potential health risks..."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
    date: "March 12, 2025",
    category: "Research News",
    title: "Pridally & NIHR HRC Bridging Gaps in Clinical Research & Innovation",
    excerpt: "Exploring how our partnership with NIHR HRC is helping to bridge the gap in clinical research participation among underrepresented communities..."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    date: "January 8, 2025",
    category: "Research News",
    title: "What Is Research Ethics and Why Is It Important for Studies?",
    excerpt: "Research ethics provides guidelines for the responsible conduct of research. It educates and monitors scientists conducting research to ensure a high ethical standard..."
  }
];

const categories = ['All Posts', 'Award(s)', 'Research News'];

const PressPage: React.FC<PressPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
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
                  <span className="text-4xl font-bold text-black mb-8 block" style={{display: 'none'}}>Pridally</span>
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
                      Safeguarding & Clinical Standards
                    </a>
                  </div>
                )}
              </div>

               <button 
                onClick={() => window.location.href = '/press'}
                className="text-black/90 hover:text-black transition-colors"
              >
                Press
              </button>

               <button 
                onClick={onGetStarted}
                className="bg-white/20 backdrop-blur-sm text-black px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                Join Pridally
              </button>

            </div>

            

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-black/80"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="space-y-4">
                <a href="#home" className="block text-black/90 hover:text-black">
                  Home
                </a>
                
                <button 
                  onClick={onGetStarted}
                  className="block w-full text-left text-black/90 hover:text-black"
                >
                  Join Pridally
                </button>

                {/* Mobile Solutions */}
                <div>
                  <button
                    onClick={() => toggleDropdown('mobile-solutions')}
                    className="flex items-center justify-between w-full text-black/90 hover:text-black"
                  >
                    Solutions
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === 'mobile-solutions' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a href="/solution_individual" className="block text-black/70 hover:text-black">
                        For Individuals
                      </a>
                      <a href="/solution_nhs" className="block text-black/70 hover:text-black">
                        For NHS/Services
                      </a>
                      <a href="/solution_uni" className="block text-black/70 hover:text-black">
                        For Universities/Research
                      </a>
                    </div>
                  )}
                </div>

                {/* Mobile About Us */}
                <div>
                  <button
                    onClick={() => toggleDropdown('mobile-about')}
                    className="flex items-center justify-between w-full text-black/90 hover:text-black"
                  >
                    About Us
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === 'mobile-about' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a href="/why_pridally" className="block text-black/70 hover:text-black">
                        Why Pridally
                      </a>
                      <a href="/safeguarding" className="block text-black/70 hover:text-black">
                        Safeguarding & Clinical Standards
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Pridally Press for Clinical News & Research News
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-8 rounded-full"></div>
          
          <div className="flex justify-center space-x-8 text-sm font-medium text-black">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`hover:text-black transition-colors pb-2 border-b-2 ${
                  activeCategory === cat 
                    ? 'text-purple-400 border-purple-400' 
                    : 'border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pressItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8">
                <div className="flex items-center text-xs font-medium text-gray-600 mb-4 uppercase tracking-wider">
                  <span>{item.date}</span>
                  <span className="mx-3 text-gray-400">|</span>
                  <span>{item.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  {item.excerpt}
                </p>
                <button className="text-purple-600 text-sm font-bold hover:text-purple-700 transition-colors flex items-center">
                  Continue Reading
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 bg-gray-900 text-white">
        <div className=" mx-auto px-4">
            <div className="text-center text-gray-400 text-sm">
              © 2025 PRIDaLLY. All rights reserved.
            </div>
          </div>
      </footer>
    </div>
  );
};

export default PressPage;