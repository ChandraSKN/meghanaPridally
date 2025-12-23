import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface SolutionNHSPageProps {
  onGetStarted: () => void;
}

// Lightweight helper icons using Lucide primitives
const BookIcon: React.FC = () => <Brain className="h-5 w-5 text-indigo-600" />;
const ChartIcon: React.FC = () => <Activity className="h-5 w-5 text-emerald-600" />;

const SolutionNHSPage: React.FC<SolutionNHSPageProps> = ({ onGetStarted }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const year = new Date().toISOString().slice(0, 4);

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
        {/* Top CTA Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Supporting LGBTQIA+ wellbeing — beyond appointments
            </h1>
            <p className="mt-2 text-gray-600">
              For Services (NHS • Charities • Hospitals • Community Organisations)
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => window.location.href = '/contact?type=intro'}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2"
            >
              Book a 20-min Intro
            </Button>
            <Button
              onClick={() => window.location.href = '/partnerships'}
              className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full px-5 py-2"
            >
              Explore Partnership Options
            </Button>
          </div>
        </div>

        {/* Subheading */}
        <Card className="border border-gray-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-gray-900">
              Many services want to engage LGBTQIA+ communities better — but face structural and trust-based barriers that digital tools often fail to address.
            </CardTitle>
            <CardDescription className="text-gray-600">
              PRIDalLY is designed to complement, not replace, your existing pathways.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* The Challenge Services Face */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">The Challenge Services Face</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-700" />
                  Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Limited time per appointment</p>
                <p>Long waiting lists</p>
                <p>Gaps between clinical touchpoints</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-700" />
                  Trust
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Past experiences of stigma or misunderstanding</p>
                <p>Fear of disclosure</p>
                <p>Low engagement with traditional systems</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-gray-700" />
                  Disengagement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Drop-off after referral</p>
                <p>Missed follow-ups</p>
                <p>Low uptake of psychoeducation resources</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-gray-700" />
                  Fragmented Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Physical and mental health treated separately</p>
                <p>Education, reflection, and support living outside services</p>
                <p>Little visibility of patient experience between visits</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What PRIDalLY Adds */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">What PRIDalLY Adds</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  A Digital Companion — not a replacement
                </CardTitle>
                <CardDescription className="text-gray-600">
                  PRIDalLY acts as a between-appointments support layer.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Encourages reflection and self-awareness</p>
                <p>Reinforces education shared by services</p>
                <p>Supports continuity without increasing clinician workload</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookIcon />
                  Education that reduces anxiety and misinformation
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Services can signpost users to trusted, inclusive health content that:
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Reduces fear before appointments</p>
                <p>Improves health literacy</p>
                <p>Supports informed conversations with clinicians</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Safe Signposting & Support Awareness
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>Understand when to seek help</p>
                <p>Prepare for appointments</p>
                <p>Reflect on questions or concerns beforehand</p>
                <p className="text-gray-500">We do not provide crisis care or diagnosis.</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartIcon />
                  Engagement Insights (aggregated, ethical)
                </CardTitle>
                <CardDescription className="text-gray-600">
                  For partner services (subject to agreement and consent):
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>High-level engagement trends</p>
                <p>Common themes or barriers</p>
                <p>Non-identifiable insights to inform service design</p>
                <p className="text-gray-500">No surveillance. No individual tracking.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Safeguarding + Governance */}
        <section className="mt-12">
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-700" />
                Safeguarding & Governance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Clear boundaries: no crisis care, diagnosis, or real-time monitoring.</p>
              <p>Ethical data practices: aggregated insights with consent; privacy by design.</p>
              <p>Clinical alignment: complements existing pathways and standards.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  onClick={() => window.location.href = '/safeguarding'}
                  className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 rounded-full px-5 py-2"
                >
                  View Safeguarding & Clinical Standards
                </Button>
                <Button
                  onClick={() => window.location.href = '/governance'}
                  className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 rounded-full px-5 py-2"
                >
                  Governance Overview
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Problem overview (summary banner) */}
        <section className="mt-12">
          <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <CardHeader>
              <CardTitle>Problem</CardTitle>
              <CardDescription className="text-gray-600">
                Access • Trust • Disengagement • Fragmented Support
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              PRIDalLY complements service pathways with education, signposting, and ethical engagement insights.
            </CardContent>
          </Card>
        </section>

        {/* Bottom CTA */}
        <section className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Book a 20-min intro</h3>
            <p className="mt-2 text-gray-600">
              Learn how PRIDalLY can complement your service pathways and support LGBTQIA+ communities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => window.location.href = '/contact?type=intro'}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2"
            >
              Book a 20-min Intro
            </Button>
            <Button
              onClick={() => window.location.href = '/partnerships'}
              className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full px-5 py-2"
            >
              Explore Partnership Options
            </Button>
          </div>
        </section>
      </main>
    
      <footer className="py-12 bg-gray-900 text-white">
        <div className=" mx-auto px-4">
            <div className="text-center text-gray-400 text-sm">
              © {year}  PRIDaLLY. All rights reserved.
            </div>
          </div>
      </footer>
    </div>
  );
};

export default SolutionNHSPage;