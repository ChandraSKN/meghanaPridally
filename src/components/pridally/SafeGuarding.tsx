import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Menu, X, ChevronDown, ArrowRight, Sparkles, CheckCircle2, Users, Lock, Eye, FileCheck, Calendar, Building2, GraduationCap, Handshake, AlertTriangle, Brain, Scale } from 'lucide-react';

interface SafeguardingPageProps {
  onGetStarted: () => void;
}

const SafeGuardingPage: React.FC<SafeguardingPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const year = new Date().getFullYear();

  const safeguardingPrinciples = [
    { icon: <Heart className="h-6 w-6" />, text: 'Trauma-informed design principles', color: 'text-pink-500', bg: 'bg-pink-50' },
    { icon: <AlertTriangle className="h-6 w-6" />, text: 'Clear escalation boundaries', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: <Users className="h-6 w-6" />, text: 'Moderation protocols for community spaces', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: <FileCheck className="h-6 w-6" />, text: 'Explicit disclaimers (non-clinical, non-emergency)', color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  const governanceFeatures = [
    { icon: <Brain className="h-6 w-6" />, text: 'Clinical pharmacy & psychology leadership', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: <GraduationCap className="h-6 w-6" />, text: 'Academic and community advisors', color: 'text-teal-500', bg: 'bg-teal-50' },
    { icon: <Lock className="h-6 w-6" />, text: 'GDPR-aligned data handling', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: <Scale className="h-6 w-6" />, text: 'Ethics-led research collaboration pathways', color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  const whoWeWorkWith = [
    { icon: <Building2 className="h-7 w-7 text-blue-600" />, title: 'NHS Services & Staff Networks', gradient: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-50 to-cyan-50' },
    { icon: <Heart className="h-7 w-7 text-pink-600" />, title: 'Local Authorities & Charities', gradient: 'from-pink-500 to-rose-500', bgGradient: 'from-pink-50 to-rose-50' },
    { icon: <GraduationCap className="h-7 w-7 text-purple-600" />, title: 'Universities & Research Teams', gradient: 'from-purple-500 to-indigo-500', bgGradient: 'from-purple-50 to-indigo-50' },
    { icon: <Users className="h-7 w-7 text-orange-600" />, title: 'LGBTQIA+ Community Organisations', gradient: 'from-orange-500 to-amber-500', bgGradient: 'from-orange-50 to-amber-50' }
  ];

  const partnershipModels = [
    { title: 'Pilot Programmes', description: 'Test and iterate with your community', emoji: '🧪' },
    { title: 'Digital Signposting', description: 'Integrate PRIDaLLY into your pathways', emoji: '🔗' },
    { title: 'Research Collaboration', description: 'Ethical, community-grounded studies', emoji: '📊' },
    { title: 'Co-Designed Initiatives', description: 'Build together from the start', emoji: '🤝' }
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
                    className="text-white hover:text-white/80"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden py-4 border-t border-white/20">
                <div className="space-y-4">
                    <a href="#home" className="block text-white/90 hover:text-white">
                    Home
                    </a>
                    
                    <button 
                    onClick={onGetStarted}
                    className="block w-full text-left text-white/90 hover:text-white"
                    >
                    Join Pridally
                    </button>

                    {/* Mobile Solutions */}
                    <div>
                    <button
                        onClick={() => toggleDropdown('mobile-solutions')}
                        className="flex items-center justify-between w-full text-white/90 hover:text-white"
                    >
                        Solutions
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === 'mobile-solutions' && (
                        <div className="mt-2 ml-4 space-y-2">
                        <a href="/solution_individual" className="block text-white/70 hover:text-white">
                            For Individuals
                        </a>
                        <a href="/solution_nhs" className="block text-white/70 hover:text-white">
                            For NHS/Services
                        </a>
                        <a href="/solution_uni" className="block text-white/70 hover:text-white">
                            For Universities/Research
                        </a>
                        </div>
                    )}
                    </div>

                    {/* Mobile About Us */}
                    <div>
                    <button
                        onClick={() => toggleDropdown('mobile-about')}
                        className="flex items-center justify-between w-full text-white/90 hover:text-white"
                    >
                        About Us
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === 'mobile-about' && (
                        <div className="mt-2 ml-4 space-y-2">
                        <a href="/why_pridally" className="block text-white/70 hover:text-white">
                            Why Pridally
                        </a>
                        <a href="/safeguarding" className="block text-white/70 hover:text-white">
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
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 font-normal">
                <Shield className="h-4 w-4" />
                🛡️ Safeguarding & Governance
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight">
                Safety is our<br />
                <span className="text-white/90">foundation.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                PRIDaLLY is built with clinical, ethical, and safeguarding oversight — because trust is earned, not assumed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/book_intro'}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group font-medium"
                >
                  Book a 20-Min Intro
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/partnerships'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full font-medium"
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
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">🛡️ Safeguarding Principles</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                Built from the ground up with safety at the core.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {safeguardingPrinciples.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 ${item.bg} p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100`}
                >
                  <div className={`${item.color} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <span className="text-gray-600 text-lg font-normal">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">Governance</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                Oversight that ensures accountability and trust.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {governanceFeatures.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 ${item.bg} p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100`}
                >
                  <div className={`${item.color} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <span className="text-gray-600 text-lg font-normal">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm mb-6 font-normal">
                <Handshake className="h-4 w-4" />
                🤝 Partnerships
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">Who We Work With</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                Collaborating with organisations that share our values.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeWorkWith.map((partner, index) => (
                <Card 
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-br ${partner.bgGradient} border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${partner.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  
                  <CardHeader className="text-center pb-4">
                    <div className="w-14 h-14 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      {partner.icon}
                    </div>
                    <CardTitle className="text-base text-gray-700 font-medium">{partner.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Models Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">Partnership Models</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                Flexible ways to work together.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipModels.map((model, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 text-center"
                >
                  <span className="text-4xl mb-4 block">{model.emoji}</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{model.title}</h3>
                  <p className="text-gray-500 text-sm font-light">{model.description}</p>
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
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 font-normal">
                <Sparkles className="h-4 w-4" />
                Ready to partner?
              </div>
              
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
                Let's Build Trust Together
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto font-light">
                We're committed to transparency, accountability, and putting safety first in everything we do.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/book_intro'}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group font-medium"
                >
                  Book a 20-Min Intro
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full font-medium"
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
            <div className="text-gray-400 text-sm font-light">
              © {year} PRIDaLLY. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400 font-light">
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