import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

   const toggleCard = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };
  
  const features = [
    {
      icon: Heart,
      title: 'Daily Health Check-ins',
      description: 'Track 5 key wellness metrics with simple, personalized questions every day.'
    },
    {
      icon: Calendar,
      title: 'Progress Calendar',
      description: 'Visualize your consistency with an intuitive calendar showing your daily completions.'
    },
    {
      icon: Activity,
      title: 'Wellness Analytics',
      description: 'Get insights into your health patterns and track improvements over time.'
    },
    {
      icon: MessageCircle,
      title: 'AI Health Assistant',
      description: 'Chat with our wellness bot/assistant for personalized tips and health guidance.'
    },
    {
      icon: Brain,
      title: 'Mental Health Focus',
      description: 'Comprehensive mood tracking and mental wellness monitoring tools.'
    },
    {
      icon: Shield,
      title: 'Doctor Integration',
      description: 'Schedule appointments and share your health data with healthcare providers.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background - 100% height */}
      <div className="absolute inset-0 w-full h-[100vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover contrast-105 brightness-110"
        >
          <source src="/videos/pridally_video_hero_page.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability - reduced opacity for brighter video */}
        <div className="absolute inset-0 bg-black/5 bg-gradient-to-b from-black/5 via-black/10 to-black/20"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <img 
                src="/Pridally_logo.png" 
                alt="Pridally" 
                className="h-[138px] w-auto mx-auto brightness-130 contrast-125"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'inline';
                }}
              />
              <span className="text-4xl font-bold text-white mb-8 block" style={{display: 'none'}}>Pridally</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white/90 hover:text-white transition-colors">
                Home
              </a>

              {/* Solutions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('solutions')}
                  className="flex items-center text-white/90 hover:text-white transition-colors"
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
                  className="flex items-center text-white/90 hover:text-white transition-colors"
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
                className="text-white/90 hover:text-white transition-colors"
              >
                Press
              </button>

              <button 
                onClick={onGetStarted}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
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

      {/* Hero Section with Video Background */}
      <div className="relative min-h-screen flex flex-col">
        {/* Hero Content - On top of video */}
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] text-white mb-6 animate-slide-up drop-shadow-2xl tracking-wide">
              PRIDalLY
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto animate-slide-up drop-shadow-lg font-light leading-relaxed">
              One stop Health and Care Solution where
              <br />
              Pride meets Allyship
            </p>
            <Button 
                size="lg" 
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfLySJExTkG6ad33uel5GCmexSGz0gEcnlrF-EhXnaLEvwbAg/viewform', '_blank')}
                className="bg-white/10 backdrop-blur-sm border border-white/50 text-white px-8 py-4 text-lg font-medium hover:bg-white/20 shadow-2xl animate-scale-in hover:scale-105 transition-all duration-300 rounded-full"
              >
                🚀 Get Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section with solid background */}
      {/* Features section */}

      <div className="relative z-10 bg-gradient-to-b from-white to-gray-50 pt-16 items-center text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
          Holistic Care System
        </h2>
        <p className="text-xl text-gray-800 max-w-2xl mx-auto">
          Your comprehensive health companion, designed with the LGBTQIA+ community in mind.
        </p>
        <div className="container mx-auto px-4 py-16">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-900 animate-scale-in border border-gray-200 hover:border-blue-300 group hover:scale-105"
                style={{ animationDelay: `${index * 0.001}s` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-float group-hover:scale-110 transition-transform duration-900 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-gray-900 text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
      </div>

    {/* Why Pridally */}
      <section
            id="why-pridally"
            className="relative py-20"
          >
            {/* subtle background accent */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto px-2 sm:px-4">
              <div className="flex flex-col text-center items-center gap-6 mb-10">
                <div>
                  <p className="uppercase tracking-[0.25em] text-xs font-semibold text-purple-600/80 mb-3">
                    IDENTITY · EVIDENCE · CARE
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Why Pridally
                  </h2>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r py-2 from-purple-600 via-pink-500 to-orange-400">
                      Designed for queer lives
                    </span>
                  </h2>
                </div>
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:snap-none">
                  {/* Card 1 */}
                  <article className="min-w-[260px] max-w-sm md:max-w-none snap-center">
                    <div 
                      onClick={() => toggleCard(1)}
                      className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 flex flex-col cursor-pointer hover:-translate-y-1"
                    >
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Heart className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600/80">
                          CORE SUPPORT
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Stigma-free, identity-aware support
                      </h3>
                      <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        A space that recognises pronouns, identities and lived realities. Every check‑in,
                        nudge and insight is designed to affirm who you are, not flatten you into a template.
                      </p>
                      <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === 1 ? 'opacity-0' : 'opacity-100'}`}>
                        Click to learn more
                      </div>
                    </div>
                  </article>

                  {/* Card 2 */}
                  <article className="min-w-[260px] max-w-sm md:max-w-none snap-center">
                    <div 
                      onClick={() => toggleCard(2)}
                      className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 flex flex-col cursor-pointer hover:-translate-y-1"
                    >
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Brain className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                          QUEERPEDIA
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Evidence-led resources (Queerpedia)
                      </h3>
                      <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        Queer-specific health explainers, not generic copy‑paste advice. Queerpedia is
                        curated from trusted, peer‑reviewed and community‑validated sources, in language
                        that actually makes sense.
                      </p>
                      <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === 2 ? 'opacity-0' : 'opacity-100'}`}>
                        Click to learn more
                      </div>
                    </div>
                  </article>

                  {/* Card 3 */}
                  <article className="min-w-[260px] max-w-sm md:max-w-none snap-center">
                    <div 
                      onClick={() => toggleCard(3)}
                      className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 flex flex-col cursor-pointer hover:-translate-y-1"
                    >
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Shield className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
                          DRUG BANK
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Bias-free medication guidance
                      </h3>
                      <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        The Queer‑Affirmative Drug Bank surfaces interactions and side‑effects that
                        matter when you're on hormones, HIV prevention/treatment, or gender‑affirming
                        care - without cis‑normative assumptions.
                      </p>
                      <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === 3 ? 'opacity-0' : 'opacity-100'}`}>
                        Click to learn more
                      </div>
                    </div>
                  </article>

                  {/* Card 4 */}
                  <article className="min-w-[260px] max-w-sm md:max-w-none snap-center">
                    <div 
                      onClick={() => toggleCard(4)}
                      className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 p-6 flex flex-col cursor-pointer hover:-translate-y-1"
                    >
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Activity className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700/80">
                          HOLISTIC CARE
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        Holistic health care
                      </h3>
                      <p className={`text-sm md:text-base text-gray-600 flex-1 transition-all duration-300 overflow-hidden ${expandedCard === 4 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        Mind, body, identity, intimacy, safety and community - connected in one daily
                        view. Pridally links check‑ins, mental health, sexual health and social support
                        into a single, living picture of your wellbeing.
                      </p>
                      <div className={`text-xs text-gray-400 mt-2 transition-opacity duration-300 ${expandedCard === 4 ? 'opacity-0' : 'opacity-100'}`}>
                        Click to learn more
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
      </section>

      {/* Vision, Mission & Core Identity */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-blue-200/30 blur-3xl rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-blue-600/80 mb-3">
              VISION · MISSION · CORE IDENTITY
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              The heart behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">PRIDalLY</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vision */}
            <article className="group h-full rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.16)] transition-all duration-300 p-6 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  ✨
                </span>
                <span className="text-s font-semibold uppercase tracking-[0.2em] text-purple-700/80">
                  Vision
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed transition-all duration-300 translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                Care where queer don't just survive - they thrive.
              </p>
            </article>

            {/* Mission */}
            <article className="group h-full rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.16)] transition-all duration-300 p-6 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  🎯
                </span>
                <span className="text-s font-semibold uppercase tracking-[0.2em] text-sky-700/80">
                  Mission
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed transition-all duration-300 translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                A queer affirming health companion blending research, AI and lived experience. 
              </p>
            </article>

            {/* Values / Ethos */}
            <article className="group h-full rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.16)] transition-all duration-300 p-6 flex flex-col lg:col-span-1 md:col-span-2">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-lg shadow-lg">
                  🧬
                </span>
                <span className="text-s font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
                  Values & Ethos
                </span>
              </div>

              {/* Short, high-level bullets */}
              Care that affirms - never fixes.
              Rooted in compassion. Backed by science.
            </article>
          </div>
        </div>
      </section>

      {/* Partnership section */}
      <section 
      id="partners" 
      className="relative py-20">
        {/* soft gradient background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full" />
            </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Heading – inspired by Vision/Mission/Core Identity */}
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-blue-600/80 mb-3">
              PARTNERS · ALLIES · COMMUNITY
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              The Pulse between{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                Purpose and Possibility
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Built with trusted partners (Nextians). We collaborate with health systems, universities, and community organisations to keep
              PRIDalLY grounded in science and shaped by lived experience.
            </p>
          </div>

          {/* Logo rails – animated, modern chips */}
          
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl animate-fade-in border border-blue-200 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">5</div>
                <div className="text-gray-700">Health Metrics</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">300+</div>
                <div className="text-gray-700">Early supporters</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-700">AI Support</div>
              </div>
            </div>
            </div>
          </div>
      </div>

      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
              We’re coming live on the App Store soon!
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-10">
              Download Pridally and start your health and care journey in just a few taps.
            </p>

            <div className="flex justify-center">
              <a
                href="#"
                className="inline-block relative group"
              >
                {/* bigger badge */}
                <img
                  src="pridally_app_store.png"
                  alt="Download on the App Store"
                  className="h-24 md:h-28 lg:h-[24rem] w-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-xl"
                />                
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div>
          {/* Call to Action */}
          <div className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                Ready to Transform Your Health?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Join thousands of users who have improved their wellbeing with daily health tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl text-xl px-10 py-6 rounded-full hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfYourFormId/viewform', '_blank')}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 shadow-2xl text-xl px-10 py-6 rounded-full hover:scale-105 transition-all duration-300 font-semibold"
                >
                  🚀 Get Early Access
                </Button>
              </div>
            </div>
          </div>

          <footer className="py-12 bg-gray-900 text-white">
            <div className="mx-auto px-4">
              <div className="text-center text-gray-400 text-sm">
                © 2025 PRIDalLY. All rights reserved.
              </div>
            </div>
          </footer>
      </div>
    </div>
  );
};

export default LandingPage;