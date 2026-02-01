import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Shield, Menu, X, ChevronDown, CheckCircle2, Book, Pill, ArrowRight, Sparkles } from 'lucide-react';

interface SolutionIndiPageProps {
  onGetStarted: () => void;
}

const SolutionIndiPage: React.FC<SolutionIndiPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hopes: ''
  });

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const features = [
    {
      icon: <span className="text-3xl">🌈</span>,
      title: 'Health360',
      description: 'Track patterns, not labels.',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      titleColor: 'text-purple-700'
    },
    {
      icon: <Book className="h-7 w-7 text-blue-600" />,
      title: 'Queerpedia',
      description: 'Health info that actually sees you.',
      gradient: 'from-blue-500 to-teal-500',
      bgGradient: 'from-blue-50 to-teal-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-700'
    },
    {
      icon: <Pill className="h-7 w-7 text-green-600" />,
      title: 'Queer-Affirmative Drug Bank',
      description: 'Medication clarity, minus bias.',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      titleColor: 'text-green-700'
    },
    {
      icon: <MessageCircle className="h-7 w-7 text-orange-600" />,
      title: 'PRISM / Chat Corner',
      description: 'Moderated. Trauma-informed. Human.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      titleColor: 'text-orange-700'
    }
  ];

  const privacyFeatures = [
    { icon: <CheckCircle2 className="h-6 w-6" />, text: 'Your data = yours', color: 'text-green-500' },
    { icon: <CheckCircle2 className="h-6 w-6" />, text: 'No selling. No surveillance', color: 'text-green-500' },
    { icon: <Shield className="h-6 w-6" />, text: 'Clear consent. Easy exit', color: 'text-blue-500' },
    { icon: <Shield className="h-6 w-6" />, text: 'UK GDPR, always', color: 'text-blue-500' }
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Now in Early Access
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your health.<br />
                <span className="text-white/90">Your identity.</span><br />
                <span className="text-white/80">Your pace.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                No diagnosis. No judgement. No pressure.<br />
                Just tools that respect you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all group"
                >
                  Join Early Access
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a href="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                  >
                    How It Works
                  </Button>
                </a>
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

        {/* What You Can Do Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What You Can Do</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tools designed with you in mind — not around you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-br ${feature.bgGradient} ${feature.borderColor} border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  
                  <CardHeader className="pb-2">
                    <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className={`text-2xl ${feature.titleColor}`}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Privacy, Simply</h2>
                <p className="text-xl text-gray-600">
                  Your trust is everything. Here's how we protect it.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {privacyFeatures.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className={`${item.color} flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-lg font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Form */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Join Early Access</h2>
                <p className="text-xl text-white/90">
                  PRIDalLY is currently in early access / pilot phase.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  By joining early:
                </h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">You shape the platform through feedback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">You access features as they roll out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">You help build safer, more inclusive health tools</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 h-14 rounded-xl text-lg focus:bg-white/30 focus:border-white/50 transition-all"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 h-14 rounded-xl text-lg focus:bg-white/30 focus:border-white/50 transition-all"
                />
                <Textarea
                  placeholder="What are you hoping PRIDalLY helps with?"
                  value={formData.hopes}
                  onChange={(e) => setFormData({ ...formData, hopes: e.target.value })}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 rounded-xl text-lg min-h-[120px] focus:bg-white/30 focus:border-white/50 transition-all resize-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all font-semibold group"
                >
                  👉 Join Early Access
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 PRIDaLLY. All rights reserved.
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

export default SolutionIndiPage;