import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Play, Pause, ChevronDown, Menu, X } from 'lucide-react';

interface PressPageProps {
  onGetStarted: () => void;
}

const videos = [
  {
    id: 1,
    src: "/videos/pridally-animations/Group%20A.mp4",
    title: "Health360 Overview",
    description: "Discover how PRIDalLY is transforming LGBTQ+ healthcare with inclusive, affirming tools.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-100 to-pink-100"
  },
  {
    id: 2,
    src: "/videos/pridally-animations/Group%20B.mp4",
    title: "Queer Affirmative & Drug Bank",
    description: "Track your wellness patterns without labels or judgement.",
    gradient: "from-pink-500 to-orange-500",
    bgGradient: "from-pink-100 to-orange-100"
  },
  {
    id: 3,
    src: "/videos/pridally-animations/Group%20C.mp4",
    title: "Queeripedia",
    description: "Access health information and medication guidance that actually sees you.",
    gradient: "from-blue-500 to-teal-500",
    bgGradient: "from-blue-100 to-teal-100"
  },
  {
    id: 4,
    src: "/videos/pridally-animations/Group%20D.mp4",
    title: "PRISM",
    description: "Connect with a moderated, trauma-informed community that celebrates you.",
    gradient: "from-emerald-500 to-cyan-500",
    bgGradient: "from-emerald-100 to-cyan-100"
  }
];

const PressPage: React.FC<PressPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [modalVideo, setModalVideo] = useState<typeof videos[0] | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const openVideoModal = (video: typeof videos[0]) => {
    setModalVideo(video);
    setIsModalClosing(false);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsModalClosing(true);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    // Wait for animation to complete before removing modal
    setTimeout(() => {
      setModalVideo(null);
      setIsModalClosing(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalVideo) {
        closeVideoModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modalVideo]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (modalVideo && modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  }, [modalVideo]);

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fullscreen Video Modal */}
      {modalVideo && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
            isModalClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeVideoModal}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
            onClick={closeVideoModal}
          >
            <X className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Video title */}
          <div className={`absolute top-6 left-6 z-10 transition-all duration-500 ${isModalClosing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h3 className="text-white text-xl md:text-2xl font-semibold">{modalVideo.title}</h3>
            <p className="text-white/70 text-sm mt-1">{modalVideo.description}</p>
          </div>

          {/* Video container */}
          <div 
            className={`relative w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
              isModalClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={modalVideo.src}
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              playsInline
            />
            
            {/* Gradient border effect */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent bg-gradient-to-br ${modalVideo.gradient} opacity-50`} style={{ WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
          </div>

          {/* Click anywhere hint */}
          <p className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm transition-all duration-500 ${isModalClosing ? 'opacity-0' : 'opacity-100'}`}>
            Click anywhere or press ESC to close
          </p>
        </div>
      )}

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
                Media
              </button>

              <button 
                onClick={() => window.location.href = '/auth'}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-orange-400 transition-colors shadow-md hover:shadow-lg"
              >
                Join Pridally
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-4">
                <a href="/" className="block text-gray-700 hover:text-gray-900">
                  Home
                </a>
                
                <button 
                  onClick={() => window.location.href = '/auth'}
                  className="block w-full text-left text-gray-700 hover:text-gray-900"
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

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pointer-events-none" />
          
          {/* Animated decorative elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 font-normal animate-fade-in">
                <Play className="h-4 w-4" />
                🎬 Watch & Explore
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight animate-fade-in-up">
                Discover PRIDalLY
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
                Watch our explainer videos to learn how we're transforming LGBTQ+ healthcare
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Video Grid Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {videos.map((video, index) => (
                <article 
                  key={video.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div 
                    className={`relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br ${video.bgGradient} p-1`}
                  >
                    <div className="bg-white rounded-[22px] overflow-hidden">
                      {/* Video Container */}
                      <div 
                        className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer"
                        onClick={() => openVideoModal(video)}
                      >
                        <video
                          src={video.src}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                        
                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${video.gradient} flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110`}>
                            <Play className="h-8 w-8 md:h-10 md:w-10 text-white ml-1" fill="white" />
                          </div>
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        
                        {/* Video number badge */}
                        <div className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-br ${video.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {video.id}
                        </div>

                        {/* Click to play hint */}
                        <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to play fullscreen
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8">
                        <h3 className={`text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:${video.gradient} group-hover:bg-clip-text transition-all duration-300`}>
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative glow effect */}
                  <div 
                    className={`absolute -inset-4 bg-gradient-to-br ${video.gradient} rounded-[40px] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pointer-events-none" />
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 font-normal">
                <Sparkles className="h-4 w-4" />
                Join our community
              </div>
              
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto font-light">
                Join a community that sees you, supports you, and celebrates you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="/auth"
                  className="inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 origin-center transform group font-medium"
                >
                  Join Pridally
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300 font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm font-light">
              © {year} PRIDalLY. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400 font-light">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out both;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PressPage;