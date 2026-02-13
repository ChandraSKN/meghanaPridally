import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Menu, X, ChevronDown, ArrowRight, Sparkles, Users, BarChart3, BookOpen, Activity, Compass } from 'lucide-react';

interface WhyPridallyPageProps {
  onGetStarted: () => void;
}

const WhyPridallyPage: React.FC<WhyPridallyPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleCard = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };

  const year = new Date().getFullYear();

  const whyPridallyFeatures = [
    { 
      icon: <Heart className="h-7 w-7" />, 
      title: 'Identity-Aware Care', 
      description: 'No explaining. No justifying. Just support that understands your lived experience and meets you where you are.', 
      bgGradient: 'from-pink-500 to-rose-500',
      label: 'AFFIRMING',
      labelColor: 'text-pink-600/80'
    },
    { 
      icon: <BookOpen className="h-7 w-7" />, 
      title: 'Evidence, Not Opinions', 
      description: 'Queerpedia = science, minus the shame. Evidence-based information written for LGBTQIA+ bodies and experiences.', 
      bgGradient: 'from-purple-500 to-indigo-500',
      label: 'KNOWLEDGE',
      labelColor: 'text-purple-600/80'
    },
    { 
      icon: <Shield className="h-7 w-7" />, 
      title: 'Bias-Free Medication Info', 
      description: 'Real guidance. Real bodies. Real lives. Medication information that accounts for the diversity of LGBTQIA+ health needs.', 
      bgGradient: 'from-blue-500 to-cyan-500',
      label: 'GUIDANCE',
      labelColor: 'text-blue-600/80'
    },
    { 
      icon: <Activity className="h-7 w-7" />, 
      title: 'Holistic Health', 
      description: 'Mental. Physical. Sexual. Reproductive. Social. Five dimensions of wellbeing, all interconnected and all supported.', 
      bgGradient: 'from-green-500 to-emerald-500',
      label: 'WELLBEING',
      labelColor: 'text-green-600/80'
    }
  ];

  const stats = [
    { number: '315+', label: 'Early supporters', icon: <Users className="h-6 w-6" /> },
    { number: '5', label: 'Dimension wellbeing model', icon: <Compass className="h-6 w-6" /> },
    { number: '∞', label: 'Built for people + services', icon: <Heart className="h-6 w-6" /> }
  ];

  const values = [
    { 
      title: 'Affirming', 
      description: "You're already enough.", 
      emoji: '💜',
      bgGradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Unfixed', 
      description: "We don't box journeys.", 
      emoji: '🦋',
      bgGradient: 'from-pink-500 to-orange-500'
    },
    { 
      title: 'Grounded', 
      description: 'Safe, steady, real care.', 
      emoji: '🌱',
      bgGradient: 'from-green-500 to-teal-500'
    },
    { 
      title: 'Compassionate', 
      description: 'Warmth before judgement.', 
      emoji: '🤗',
      bgGradient: 'from-orange-500 to-amber-500'
    },
    { 
      title: 'Validated', 
      description: 'Evidence-led, always.', 
      emoji: '✅',
      bgGradient: 'from-blue-500 to-indigo-500'
    }
  ];

  const healthDimensions = [
    { emoji: '🧠', label: 'Mental', color: 'from-purple-500 to-indigo-500' },
    { emoji: '💪', label: 'Physical', color: 'from-blue-500 to-cyan-500' },
    { emoji: '❤️', label: 'Sexual', color: 'from-pink-500 to-rose-500' },
    { emoji: '🤰', label: 'Reproductive', color: 'from-orange-500 to-amber-500' },
    { emoji: '🤝', label: 'Social', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
                    
                    <button 
                    onClick={() => window.location.href = '/auth'}
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                 Why PRIDalLY
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Care that affirms <br />
                <span className="text-white/90"> - never fixes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Rooted in compassion. Backed by science.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  Join Pridally
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Talk to Us
                </Button>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Why PRIDalLY Features Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-purple-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtle background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
            </div>

            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-purple-600/80 mb-3">
                IDENTITY · EVIDENCE · CARE
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">✨ Why PRIDalLY</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 font-semibold">different</span>. Built better. Built for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {whyPridallyFeatures.map((feature, index) => (
                <article key={index} className="min-w-[260px] snap-center">
                  <div 
                    onClick={() => toggleCard(index + 1)}
                    className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 flex flex-col cursor-pointer hover:-translate-y-1"
                  >
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.bgGradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </span>
                      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${feature.labelColor}`}>
                        {feature.label}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === index + 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {feature.description}
                    </p>
                    <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === index + 1 ? 'opacity-0' : 'opacity-100'}`}>
                      Click to learn more
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>


        

        {/* 5 Dimensions of Health Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-green-600/80 mb-3">
                HOLISTIC · INTEGRATED · COMPLETE
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">5 Dimensions of Health</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Because wellbeing isn't one-dimensional.
              </p>
            </div>

            {/* Circular Layout */}
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl z-10">
                <div className="text-center text-white">
                  <span className="text-3xl md:text-4xl font-bold">5</span>
                  <p className="text-xs md:text-sm font-medium">Dimensions</p>
                </div>
              </div>

              {/* Connecting ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-gray-200" />

              {/* Dimension items positioned in a circle */}
              {healthDimensions.map((dimension, index) => {
                // Calculate position around the circle (5 items = 72 degrees apart, starting from top)
                const angle = (index * 72 - 90) * (Math.PI / 180);
                const radius = 45; // percentage from center
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${dimension.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl cursor-pointer`}
                      >
                        <span className="text-2xl md:text-3xl">{dimension.emoji}</span>
                      </div>
                      <span className="mt-2 font-semibold text-gray-900 text-sm md:text-base whitespace-nowrap">
                        {dimension.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile fallback - horizontal scroll for very small screens */}
            <div className="flex md:hidden flex-wrap justify-center gap-4 mt-8">
              {healthDimensions.map((dimension, index) => (
                <div 
                  key={`mobile-${index}`}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 border border-white/40 hover:-translate-y-1 flex items-center gap-2"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${dimension.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-lg">{dimension.emoji}</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{dimension.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Lilo Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-purple-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtle background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.25em] text-xs font-semibold text-purple-600/80 mb-3">
                  COMPANION · GUIDE · FRIEND
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">🐛 Meet Lilo</h2>
                <p className="text-xl text-gray-600 italic">
                  "Life's not a straight line - it's a Lila. And I'm here for the journey."
                </p>
              </div>

              <div className="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Lilo Visual */}
                  <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-45 h-40 md:w-48 md:h-58 flex items-center justify-center">
                      <img 
                        src="/lilo_image.png" 
                        alt="Lilo - Your companion" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 rounded-full items-center justify-center hidden"
                      >
                        <span className="text-6xl md:text-7xl">🐛</span>
                      </div>
                    </div>
                  </div>

                  {/* Lilo Description */}
                  <div className="flex-grow text-center md:text-left">
                    <p className="text-xl text-gray-700 mb-6">
                      Your soft-voiced, rainbow-hued caterpillar companion. They grow as you grow - messy, proud, and real.
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Warm</span>
                      <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Validating</span>
                      <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">A little cheeky</span>
                      <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">Very human</span>
                    </div>

                    <blockquote className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-purple-400 shadow-sm">
                      <p className="text-gray-700 italic">
                        "Lila = magic. And I'm here as a companion in your Lila."
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* By the Numbers Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <BarChart3 className="h-4 w-4" />
                📊 By the Numbers
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Growing Together</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-white/80 flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.number}</div>
                  <p className="text-white/80 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-pink-600/80 mb-3">
                PRINCIPLES · BELIEFS · FOUNDATION
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we build.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 border border-white/40 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br ${value.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{value.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Ready to begin?
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Your journey starts here.
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
                Join a community that sees you, supports you, and celebrates you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  👉 Join Pridally
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {year} PRIDalLY. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhyPridallyPage;