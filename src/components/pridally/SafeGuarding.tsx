import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface Safeguarding {
  onGetStarted: () => void;
}

const SafeGuardingPage: React.FC<SafeguardingPageProps> = ({ onGetStarted }) => {

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
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* 🛡️ Safeguarding & Governance */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 via-white to-white opacity-70 pointer-events-none" />
          <div className="relative">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Safeguarding & Governance
                </CardTitle>
                <CardDescription>
                  PRIDalLY is built with clinical, ethical, and safeguarding oversight.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Trauma-informed design principles</li>
                      <li>Clear escalation boundaries</li>
                      <li>Moderation protocols for community spaces</li>
                      <li>Explicit disclaimers (non-clinical, non-emergency)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Governance includes:</div>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Clinical pharmacy & psychology leadership</li>
                      <li>Academic and community advisors</li>
                      <li>GDPR-aligned data handling</li>
                      <li>Ethics-led research collaboration pathways</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 🤝 Who We Work With */}
        <section className="mt-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>Who We Work With</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>NHS services & staff networks</li>
                  <li>Local authorities and charities</li>
                  <li>Universities and research teams</li>
                  <li>LGBTQIA+ community organisations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>Partnership Models</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Pilot programmes</li>
                  <li>Digital signposting support</li>
                  <li>Research collaboration</li>
                  <li>Co-designed wellbeing initiatives</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 📅 Book a 20-Minute Intro */}
        <section className="mt-16">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Book a 20-Minute Intro
              </CardTitle>
              <CardDescription>
                If your service is exploring:
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <ul className="list-disc ml-5 space-y-1">
                <li>Better LGBTQIA+ engagement</li>
                <li>Digital wellbeing support</li>
                <li>Inclusive education tools</li>
                <li>Ethical research-practice alignment</li>
              </ul>
              <p className="mt-4">Let’s talk.</p>
              <div className="mt-6">
                <Button
                  onClick={() => window.location.href = '/book_intro'}
                  className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                >
                  👉 Book a 20-Minute Intro
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
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

export default SafeGuardingPage;