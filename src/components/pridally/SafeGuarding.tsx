import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Menu, X, ChevronDown, ArrowRight, Sparkles, Users, Lock, FileCheck, Calendar, Building2, GraduationCap, Handshake, AlertTriangle, Brain, Scale } from 'lucide-react';

interface SafeguardingPageProps {
  onGetStarted: () => void;
}

const SafeGuardingPage: React.FC<SafeguardingPageProps> = ({ onGetStarted }) => {
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

  const safeguardingPrinciples = [
    { 
      icon: <Heart className="h-7 w-7" />, 
      title: 'Trauma-Informed Design',
      description: 'Every interaction is designed with sensitivity to trauma, ensuring users feel safe and supported throughout their journey.',
      bgGradient: 'from-pink-500 to-rose-500',
      label: 'CARE',
      labelColor: 'text-pink-600/80'
    },
    { 
      icon: <AlertTriangle className="h-7 w-7" />, 
      title: 'Clear Escalation Boundaries',
      description: 'Well-defined protocols for when and how to escalate concerns, ensuring appropriate responses to different levels of risk.',
      bgGradient: 'from-orange-500 to-amber-500',
      label: 'PROTOCOL',
      labelColor: 'text-orange-600/80'
    },
    { 
      icon: <Users className="h-7 w-7" />, 
      title: 'Community Moderation',
      description: 'Robust moderation protocols for community spaces, combining AI monitoring with human oversight for safe interactions.',
      bgGradient: 'from-purple-500 to-indigo-500',
      label: 'SAFETY',
      labelColor: 'text-purple-600/80'
    },
    { 
      icon: <FileCheck className="h-7 w-7" />, 
      title: 'Explicit Disclaimers',
      description: 'Clear communication that PRIDaLLY is non-clinical and non-emergency, with appropriate signposting to professional services.',
      bgGradient: 'from-blue-500 to-cyan-500',
      label: 'CLARITY',
      labelColor: 'text-blue-600/80'
    }
  ];

  const governanceFeatures = [
    { 
      icon: <Brain className="h-7 w-7" />, 
      title: 'Clinical Leadership',
      description: 'Guided by clinical pharmacy and psychology professionals ensuring evidence-based approaches and clinical best practices.',
      bgGradient: 'from-indigo-500 to-purple-600',
      label: 'CLINICAL',
      labelColor: 'text-indigo-600/80'
    },
    { 
      icon: <GraduationCap className="h-7 w-7" />, 
      title: 'Academic Advisors',
      description: 'Academic and community advisors provide research-backed insights and ensure our approach aligns with current evidence.',
      bgGradient: 'from-teal-500 to-cyan-500',
      label: 'RESEARCH',
      labelColor: 'text-teal-600/80'
    },
    { 
      icon: <Lock className="h-7 w-7" />, 
      title: 'GDPR-Aligned',
      description: 'Full compliance with GDPR and data protection regulations, ensuring user privacy and data security at every level.',
      bgGradient: 'from-green-500 to-emerald-500',
      label: 'PRIVACY',
      labelColor: 'text-green-600/80'
    },
    { 
      icon: <Scale className="h-7 w-7" />, 
      title: 'Ethics-Led Research',
      description: 'All research collaborations follow rigorous ethical frameworks with community consent and benefit-sharing principles.',
      bgGradient: 'from-amber-500 to-orange-500',
      label: 'ETHICS',
      labelColor: 'text-amber-600/80'
    }
  ];

  const whoWeWorkWith = [
    { 
      icon: <Building2 className="h-7 w-7" />, 
      title: 'NHS Services & Staff Networks', 
      description: 'Supporting healthcare providers with inclusive digital tools and training resources.',
      bgGradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <Heart className="h-7 w-7" />, 
      title: 'Local Authorities & Charities', 
      description: 'Partnering with community organisations to extend reach and impact.',
      bgGradient: 'from-pink-500 to-rose-500'
    },
    { 
      icon: <GraduationCap className="h-7 w-7" />, 
      title: 'Universities & Research Teams', 
      description: 'Collaborating on ethical, community-grounded research initiatives.',
      bgGradient: 'from-purple-500 to-indigo-500'
    },
    { 
      icon: <Users className="h-7 w-7" />, 
      title: 'LGBTQIA+ Community Organisations', 
      description: 'Working alongside community groups to co-design inclusive solutions.',
      bgGradient: 'from-orange-500 to-amber-500'
    }
  ];

  const partnershipModels = [
    { title: 'Pilot Programmes', description: 'Test and iterate with your community', emoji: '🧪', bgGradient: 'from-purple-500 to-indigo-500' },
    { title: 'Digital Signposting', description: 'Integrate PRIDaLLY into your pathways', emoji: '🔗', bgGradient: 'from-blue-500 to-cyan-500' },
    { title: 'Research Collaboration', description: 'Ethical, community-grounded studies', emoji: '📊', bgGradient: 'from-green-500 to-emerald-500' },
    { title: 'Co-Designed Initiatives', description: 'Build together from the start', emoji: '🤝', bgGradient: 'from-pink-500 to-rose-500' }
  ];

  const introTopics = [
    { icon: <Users className="h-5 w-5" />, text: 'Better LGBTQIA+ engagement' },
    { icon: <Heart className="h-5 w-5" />, text: 'Digital wellbeing support' },
    { icon: <GraduationCap className="h-5 w-5" />, text: 'Inclusive education tools' },
    { icon: <Scale className="h-5 w-5" />, text: 'Ethical research-practice alignment' }
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
                className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-blue-400 transition-colors shadow-md hover:shadow-lg"
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
                  className="block w-full text-left bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition-colors"
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Shield className="h-4 w-4" />
                Safeguarding & Governance
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Safety is our<br />
                <span className="text-white/90">foundation.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                PRIDaLLY is built with clinical, ethical, and safeguarding oversight - because trust is earned, not assumed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/book_intro'}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  Book a 20-Min Intro
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/partnerships'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Partner With Us
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

        {/* Safeguarding Principles Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-indigo-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtle background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-indigo-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
            </div>

            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-indigo-600/80 mb-3">
                PROTECTION · CARE · TRUST
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">🛡️ Safeguarding Principles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built from the ground up with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 font-semibold">safety at the core</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {safeguardingPrinciples.map((feature, index) => (
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

        {/* Governance Section */}
        <section className="py-20 md:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-purple-600/80 mb-3">
                OVERSIGHT · ACCOUNTABILITY · INTEGRITY
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Governance</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Oversight that ensures <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 font-semibold">accountability and trust</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {governanceFeatures.map((feature, index) => (
                <article key={index} className="min-w-[260px] snap-center">
                  <div 
                    onClick={() => toggleCard(index + 5)}
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
                    <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === index + 5 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {feature.description}
                    </p>
                    <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === index + 5 ? 'opacity-0' : 'opacity-100'}`}>
                      Click to learn more
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-purple-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtle background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
            </div>

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm mb-6">
                <Handshake className="h-4 w-4" />
                🤝 Partnerships
              </div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-purple-600/80 mb-3">
                COLLABORATION · COMMUNITY · IMPACT
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Who We Work With</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Collaborating with organisations that <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 font-semibold">share our values</span>.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeWorkWith.map((partner, index) => (
                <div 
                  key={index}
                  className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 text-center cursor-pointer hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br ${partner.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white">{partner.icon}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{partner.title}</h3>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Models Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-pink-600/80 mb-3">
                FLEXIBLE · TAILORED · COLLABORATIVE
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Partnership Models</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Flexible ways to work together.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipModels.map((model, index) => (
                <div 
                  key={index}
                  className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 text-center cursor-pointer hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${model.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{model.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{model.title}</h3>
                  <p className="text-sm text-gray-600">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Intro Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">📅 Book a 20-Minute Intro</h2>
                  <p className="text-xl text-gray-500 font-light">
                    If your service is exploring:
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {introTopics.map((topic, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
                    >
                      <div className="text-indigo-500">
                        {topic.icon}
                      </div>
                      <span className="text-gray-600 font-normal">{topic.text}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xl text-gray-600 mb-6 font-normal">Let's talk.</p>
                  <Button
                    onClick={() => window.location.href = '/book_intro'}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group font-medium"
                  >
                    👉 Book a 20-Minute Intro
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Ready to partner?
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Let's Build Trust Together
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
                We're committed to transparency, accountability, and putting safety first in everything we do.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/book_intro'}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  👉 Book a 20-Min Intro
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Contact Us
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

export default SafeGuardingPage;