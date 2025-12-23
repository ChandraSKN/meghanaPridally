import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface SolutionUniPageProps {
  onGetStarted: () => void;
}

const SolutionUniPage: React.FC<SolutionUniPageProps> = ({ onGetStarted }) => {

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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-white to-white opacity-80 pointer-events-none" />
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                  Advancing inclusive health research — ethically, collaboratively, impact-first
                </h1>
                <p className="text-lg text-gray-700">
                  PRIDalLY partners with universities, researchers, and ethics-led institutions to support inclusive, community-informed research across mental health, medication use, wellbeing, and health behaviour — particularly within LGBTQIA+ populations often under-represented in traditional studies.
                </p>
                <p className="text-gray-800 font-medium">
                  We don’t replace research frameworks. We strengthen them with lived-experience-aware digital infrastructure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={onGetStarted}
                    className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Partner with PRIDalLY
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/contact_research'}
                    className="rounded-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Explore Research Collaboration
                  </Button>
                </div>
              </div>
              <div className="relative rounded-2xl bg-gradient-to-tr from-fuchsia-200 via-indigo-200 to-sky-200 h-64 md:h-80 animate-in fade-in slide-in-from-right duration-700">
                <div className="absolute inset-0 mix-blend-multiply opacity-60 blur-2xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl bg-white/70 backdrop-blur-md p-6 shadow-xl border border-white/50">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-indigo-600" />
                      <span className="font-semibold text-gray-900">Ethics-first Digital Infrastructure</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      Lived-experience-informed UX and safeguarding built in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why PRIDalLY for Academic Research */}
        <section className="mt-20 space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why PRIDalLY for Academic Research?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-600" />
                  Reach under-represented communities — responsibly
                </CardTitle>
                <CardDescription>
                  PRIDalLY enables ethical engagement with LGBTQIA+ participants through trust-led onboarding, clear consent flows, and community-validated language.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Designed with safeguarding at the core</li>
                  <li>Trauma-informed and identity-affirming UX</li>
                  <li>Reduces participation drop-off caused by mistrust or stigma</li>
                </ul>
              </CardContent>
            </Card>
            {/* Card 2 */}
            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  Real-world data, contextualised — not extractive
                </CardTitle>
                <CardDescription>
                  Our platform supports observational, qualitative, and mixed-methods research by capturing context, not just outcomes.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <div>
                  <div className="font-medium">Potential data domains (research-led, opt-in):</div>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Self-reported wellbeing trends (mental & physical)</li>
                    <li>Medication experiences and side-effects (non-diagnostic)</li>
                    <li>Engagement with health education content</li>
                    <li>Service access barriers and facilitators</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Data access is governed by ethics approval, data-sharing agreements, and participant consent.
                </p>
              </CardContent>
            </Card>
            {/* Card 3 */}
            <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-600" />
                  Built for ethics committees & supervisors
                </CardTitle>
                <CardDescription>
                  PRIDalLY is designed to align with established academic and regulatory frameworks.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <div>
                  <div className="font-medium">PRIDalLY aligns with:</div>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>University ethics frameworks</li>
                    <li>GDPR and UK data-protection principles</li>
                    <li>Safeguarding and risk-escalation pathways</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium">We support:</div>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Ethics application documentation</li>
                    <li>Participant information sheets (PIS)</li>
                    <li>Research-safe onboarding flows</li>
                    <li>Non-clinical disclaimers and duty-of-care boundaries</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Collaboration Models */}
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Collaboration Models</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Research Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Co-designed studies</li>
                  <li>Pilot research projects</li>
                  <li>MSc / PhD dissertation collaborations</li>
                  <li>Longitudinal wellbeing studies</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  Teaching & Student Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Live briefs (psychology, pharmacy, public health, design)</li>
                  <li>Research assistant internships</li>
                  <li>Digital health & inclusive-care case studies</li>
                  <li>Ethics-focused research training exposure</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  Knowledge Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Joint publications</li>
                  <li>Conference presentations</li>
                  <li>Policy-relevant insights</li>
                  <li>Community-grounded dissemination</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Makes PRIDalLY Different */}
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Makes PRIDalLY Different?</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardContent className="pt-6 text-gray-800">
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full bg-gray-100">✔ Not a recruitment platform</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100">✔ Not a diagnostic tool</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100">✔ Not extractive research</span>
                </div>
                <p className="mt-4 text-sm text-gray-700">
                  PRIDalLY is a research-enabling ecosystem — bridging academia, community trust, and digital health practice.
                </p>
                <ul className="mt-3 list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Participant dignity over volume</li>
                  <li>Insight over surveillance</li>
                  <li>Impact over optics</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>Current & Emerging Research Themes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-5 space-y-1">
                  <li>LGBTQIA+ mental health & wellbeing trajectories</li>
                  <li>Medication experiences & adherence in marginalised groups</li>
                  <li>Health literacy & digital education outcomes</li>
                  <li>Service accessibility & trust in healthcare systems</li>
                  <li>Intersectionality, migration, and health access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Governance & Oversight */}
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Governance & Oversight</h2>
          <Card className="mt-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardContent className="pt-6 text-sm text-gray-700">
              <ul className="list-disc ml-5 space-y-1">
                <li>Founder-led with clinical pharmacy & psychology expertise</li>
                <li>Academic advisors across psychology, pharmacy, and public health</li>
                <li>Community-informed design principles</li>
                <li>Clear separation between research, support, and peer spaces</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Interested in Collaborating */}
        <section className="mt-20">
          <div className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Interested in Collaborating?</h2>
            <p className="mt-4 text-gray-700">
              Whether you are:
            </p>
            <ul className="mt-2 list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>A researcher seeking ethical digital support tools</li>
              <li>A supervisor exploring inclusive dissertation projects</li>
              <li>A department interested in live briefs or placements</li>
              <li>A university aiming to strengthen impact and EDI commitments</li>
            </ul>
            <p className="mt-4 text-gray-700">We’d love to explore alignment.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => window.location.href = '/start_research_conversation'}
                className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
              >
                Start a Research Conversation
              </Button>
              <Button
                onClick={() => window.location.href = '/request_collaboration_pack'}
                className="rounded-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
              >
                Request Collaboration Pack
              </Button>
            </div>
          </div>
        </section>
      </main>
    
      <footer className="py-12 bg-gray-900 text-white">
        <div className=" mx-auto px-4">
            <div className="text-center text-gray-400 text-sm">
              © {year} PRIDaLLY. All rights reserved.
            </div>
          </div>
      </footer>
    </div>
  );
};

export default SolutionUniPage;