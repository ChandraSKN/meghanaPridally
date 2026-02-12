import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Menu, X, ChevronDown, ArrowRight, Sparkles, CheckCircle2, Users, GraduationCap, FileCheck, Lock, Bot, AlertTriangle, XCircle } from 'lucide-react';

interface SolutionUniPageProps {
  onGetStarted: () => void;
}

const SolutionUniPage: React.FC<SolutionUniPageProps> = ({ onGetStarted }) => {
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
    { icon: <Users className="h-6 w-6" />, text: 'Trust-led LGBTQIA+ engagement', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: <FileCheck className="h-6 w-6" />, text: 'Contextual, opt-in data', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <CheckCircle2 className="h-6 w-6" />, text: 'Ethics-committee ready', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: <Shield className="h-6 w-6" />, text: 'Safeguarding first, always', color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  const enableFeatures = [
    {
      icon: <GraduationCap className="h-7 w-7" />,
      title: 'MSc / PhD Projects',
      description: 'Support for dissertation-level research with ethical infrastructure. Access to community insights while maintaining participant dignity and privacy throughout the research process.',
      bgGradient: 'from-indigo-500 to-purple-600',
      label: 'ACADEMIC',
      labelColor: 'text-indigo-600/80'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Live Briefs & Placements',
      description: 'Real-world learning opportunities for students. Engage with meaningful projects that create positive impact for LGBTQIA+ communities while building practical skills.',
      bgGradient: 'from-teal-500 to-cyan-500',
      label: 'EXPERIENTIAL',
      labelColor: 'text-teal-600/80'
    },
    {
      icon: <FileCheck className="h-7 w-7" />,
      title: 'Ethical Digital Studies',
      description: 'Research frameworks that respect participant dignity. Built-in consent mechanisms and transparent data handling practices that meet the highest ethical standards.',
      bgGradient: 'from-emerald-500 to-green-500',
      label: 'METHODOLOGY',
      labelColor: 'text-emerald-600/80'
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: 'Community-Grounded Impact',
      description: 'Research that gives back to the communities it studies. Co-designed approaches that centre lived experience and create lasting benefit for participants.',
      bgGradient: 'from-pink-500 to-rose-500',
      label: 'IMPACT',
      labelColor: 'text-pink-600/80'
    }
  ];

  const safetyFeatures = [
    { icon: <Lock className="h-6 w-6" />, text: 'Privacy by design', color: 'text-blue-500' },
    { icon: <Users className="h-6 w-6" />, text: 'Human + AI moderation', color: 'text-purple-500' },
    { icon: <AlertTriangle className="h-6 w-6" />, text: 'Clear escalation', color: 'text-orange-500' },
    { icon: <Bot className="h-6 w-6" />, text: 'Ethical AI - with a soul', color: 'text-teal-500' }
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
                    className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-pink-400 transition-colors shadow-md hover:shadow-lg"
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
                    className="block w-full text-left bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-pink-400 transition-colors"
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <span className="text-lg">🎓</span>
                For Universities & Research
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Inclusive research<br />
                <span className="text-white/90">Without extraction</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Partner with us to advance ethical, community-informed research.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  Partner with PRIDaLLY
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact_research'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Research Collaboration
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

        {/* Why PRIDaLLY Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Why PRIDaLLY</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 font-semibold">academic rigour</span> and community trust.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {whyPridallyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`${feature.bg} rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-white/40`}
                >
                  <div className={`${feature.color} flex justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{feature.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Enable Section - Updated to match LandingPage style */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-indigo-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtle background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-indigo-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
            </div>

            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-indigo-600/80 mb-3">
                RESEARCH · LEARNING · IMPACT
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What We Enable</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Research infrastructure that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 font-semibold">respects participants</span> and delivers impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {enableFeatures.map((feature, index) => (
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

        {/* Not This / This Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-gray-600/80 mb-3">
                OUR APPROACH
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Research Done Right</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Not This */}
              <div className="group bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-700">Not This</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    Recruitment farm
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    Diagnostic tool
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    Data grab
                  </li>
                </ul>
              </div>

              {/* This */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">This</h3>
                </div>
                <p className="text-xl text-gray-700 font-medium">
                  A research-enabling ecosystem.
                </p>
                <p className="mt-4 text-gray-600">
                  Built on trust, transparency, and community partnership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">🔒 Safety First. Always.</h2>
                <p className="text-xl text-gray-600">
                  Built with care, operated with integrity.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {safetyFeatures.map((item, index) => (
                  <div 
                    key={index}
                    className="group flex items-center gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 border border-white/40 hover:-translate-y-1"
                  >
                    <div className={`${item.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-lg font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Ready to collaborate?
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Let's Build Together
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
                Partner with PRIDaLLY to advance inclusive, ethical research that makes a real difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  👉 Partner with PRIDaLLY
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/request_collaboration_pack'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Request Collaboration Pack
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
              © {year} PRIDaLLY. All rights reserved.
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

export default SolutionUniPage;