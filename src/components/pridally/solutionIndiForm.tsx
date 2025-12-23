import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown, CheckCircle2, Book, Pill, Users, ArrowRight } from 'lucide-react';

interface SolutionIndiPageProps {
  onGetStarted: () => void;
}

const SolutionIndiPage: React.FC<SolutionIndiPageProps> = ({ onGetStarted }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Posts');
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
    // Handle form submission
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">For Individuals</h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90">Your health. Your identity. Your pace.</p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-white/80">
              PRIDalLY is a digital wellbeing companion designed for LGBTQIA+ people who want safe, stigma-free support
              without having to explain or justify who they are.
            </p>
            <p className="text-lg mb-12 text-white/90 font-medium">
              No diagnosis. No judgement. No pressure. Just tools that respect you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Join Early Access
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* What You Can Do Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">What You Can Do with PRIDalLY</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Health360 */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🌈</span>
                  </div>
                  <CardTitle className="text-purple-700">Health360 — see your wellbeing as a whole</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Track and reflect on your health across multiple dimensions — not just symptoms.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Physical and mental wellbeing check-ins</li>
                    <li>• Medication routines and emotional responses</li>
                    <li>• Patterns over time (mood, energy, triggers)</li>
                    <li>• Personal notes you control</li>
                  </ul>
                  <p className="text-sm text-purple-600 font-medium mt-4">
                    This is self-reflection, not medical diagnosis.
                  </p>
                </CardContent>
              </Card>

              {/* Queerpedia */}
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-700">Queerpedia — health information that actually sees you</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Evidence-based, culturally aware health education — written in inclusive, accessible language.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Mental health and wellbeing</li>
                    <li>• Medication awareness and side effects</li>
                    <li>• Body changes, stress, sleep, and self-care</li>
                    <li>• Myth-busting and trusted resources</li>
                  </ul>
                  <p className="text-sm text-blue-600 font-medium mt-4">
                    No shame. No assumptions. No outdated language.
                  </p>
                </CardContent>
              </Card>

              {/* Drug Bank */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Pill className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-green-700">Queer-Affirmative Drug Bank — medication information without bias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Understand medications in a way that acknowledges identity, lived experience, and real-world concerns.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Plain-language explanations</li>
                    <li>• Identity-aware considerations</li>
                    <li>• Common side effects and emotional impacts</li>
                    <li>• Guidance that encourages informed conversations with clinicians</li>
                  </ul>
                  <p className="text-sm text-green-600 font-medium mt-4">
                    PRIDalLY does not prescribe or replace medical advice.
                  </p>
                </CardContent>
              </Card>

              {/* PRISM/Chat Corner */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-700">PRISM / Chat Corner — you're not alone here</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A moderated, trauma-informed space for peer connection and reflection.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Community-led discussions</li>
                    <li>• Emotional check-ins and shared experiences</li>
                    <li>• Clear boundaries and safeguarding</li>
                    <li>• No crisis replacement — but a place to be heard</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">How Your Privacy Works</h2>
              <p className="text-xl text-center mb-8 font-semibold text-blue-700">Your data belongs to you.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">PRIDalLY is built with privacy-by-design principles:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      You control what you share
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      No selling of personal data
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Clear consent for any research use
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Data stored and processed in line with UK GDPR principles
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">We are transparent about:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      What we collect
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Why we collect it
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      How it is used
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      When it is deleted
                    </li>
                  </ul>
                  <p className="text-blue-700 font-medium mt-4">You can disengage at any time.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Early Access Form */}
          <section className="bg-gradient-primary text-white rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join Early Access</h2>
              <p className="text-lg mb-6 text-white/90">
                PRIDalLY is currently in early access / pilot phase.
              </p>
              
              <div className="text-left bg-white/10 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">By joining early:</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• You shape the platform through feedback</li>
                  <li>• You access features as they roll out</li>
                  <li>• You help build safer, more inclusive health tools</li>
                </ul>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="What are you hoping PRIDalLY helps with?"
                    value={formData.hopes}
                    onChange={(e) => setFormData({ ...formData, hopes: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-[100px]"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 py-3"
                >
                  👉 Join Early Access
                </Button>
              </form>
            </div>
          </section>
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

export default SolutionIndiPage;