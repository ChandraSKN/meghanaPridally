import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Calendar, MessageCircle, Shield, Menu, X, ChevronDown } from 'lucide-react';

interface WhyPridallyPageProps {
  onGetStarted: () => void;
}

const WhyPridallyPage: React.FC<WhyPridallyPageProps> = ({ onGetStarted }) => {

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
        {/* 💖 Hero Banner */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-white to-white opacity-80 pointer-events-none" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                ✨ Care that meets you gently, right where you are.
              </h1>
              <p className="text-lg text-gray-700">
                🌈 Whether you’re navigating identity, health, or healing — PRIDaLLY offers warmth, wisdom, and safety at every step.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={onGetStarted}
                  className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                >
                  Join Pridally
                </Button>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="rounded-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
                >
                  Talk to Us
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl bg-gradient-to-tr from-fuchsia-200 via-indigo-200 to-sky-200 h-64 md:h-80 animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute inset-0 mix-blend-multiply opacity-60 blur-2xl animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-xl bg-white/70 backdrop-blur-md p-6 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-rose-600" />
                    <span className="font-semibold text-gray-900">Affirming, ethics-first care</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    Warm design, community voice, and privacy at the core.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🧠 What Is PRIDaLLY? */}
        <section className="mt-16">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>What Is PRIDaLLY?</CardTitle>
              <CardDescription>
                Your one-stop health and care solution for LGBTQIA+ individuals and allies.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>
                It’s not just an app. It’s a living, breathing support system — powered by science, shaped by community, and designed to help you feel seen, supported, and safe.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 🧬 What Makes Us Different */}
        <section className="mt-16 grid md:grid-cols-2 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>What Makes Us Different?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>We’re not here to “fix” you. We’re here to:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Affirm your identity</li>
                <li>Centre your voice</li>
                <li>Respect your privacy</li>
                <li>Deliver care that’s both soft and strong</li>
              </ul>
              <p className="mt-2">Other apps might help you with one thing. We’re your one-stop health ally.</p>
            </CardContent>
          </Card>

          {/* 🔍 Key Features */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <ul className="list-disc ml-5 space-y-1">
                <li>🧠 Quick Assessment – private, tailored, in your words</li>
                <li>💬 Chat Companion – Lilo is here to talk, listen, and guide</li>
                <li>📖 Mood + Journal Log – reflect and track your growth</li>
                <li>📊 Personal Insights – gentle nudges from your patterns</li>
                <li>🧪 Research-Backed – in partnership with universities & clinicians</li>
                <li>🛡️ Safety Scores – AI + human-reviewed interactions</li>
              </ul>
              <div className="mt-3">
                <div className="font-medium">💡 Five-Dimensional Health</div>
                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  <span className="px-2 py-1 rounded-full bg-gray-100">Mental 🧠</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100">Physical 💪</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100">Sexual ❤️</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100">Reproductive 🤰</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100">Social 🤝</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 🛡️ Safety First */}
        <section className="mt-16">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Safety First. Always.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>We believe safety isn’t a feature — it’s a foundation.</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>🔒 Privacy by design</li>
                <li>👤 Human + AI review of all features</li>
                <li>📊 Safety Scores + scenario testing</li>
                <li>🔍 Real-time feedback loop</li>
                <li>🧠 Ethical AI with a soul</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 🐛 Coming Soon: LiLo */}
        <section className="mt-16 grid md:grid-cols-2 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Coming Soon: Our New Chat Companion — LiLo</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                Lilo evolves with you. Every challenge and breakthrough — they grow alongside you, until one day… 🦋 Lila they become a butterfly and embrace you.
              </p>
              <div className="mt-2">
                <div className="font-medium">“Voices of Pride”</div>
                <ul className="list-disc ml-5 space-y-1">
                  <li>“PRIDaLLY helped me track my transition and my mood swings in a way that didn’t feel clinical or cold.”</li>
                  <li>“As a parent of a trans kid, I finally feel like I have tools to support them — and learn with them.”</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 📘 How It Works */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <ul className="list-disc ml-5 space-y-1">
                <li>Choose your path: User, Ally, or Provider</li>
                <li>Set your goals: from mental wellness to medical needs</li>
                <li>Use tools: Assessments, Journals, Forums, Insights</li>
                <li>Grow: reflect, evolve, and thrive</li>
                <li>Track your growth as your caterpillar companion transforms 🌈</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 🐛 Introducing: Lilo’s Lila */}
        <section className="mt-16">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Introducing: Lilo’s Lila</CardTitle>
              <CardDescription>
                “Life’s not a straight line — it’s a Lila. And I’m Lilo — your tiny, colorful buddy through every twist, pause, and proud leap.”
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-3">
              <p>
                Lilo is your soft-voiced, rainbow-hued caterpillar companion — a witness, cheerleader, and low-key philosopher. They grow as you grow.
              </p>
              <div>
                <div className="font-medium">What is Lilo’s Lila?</div>
                <ul className="list-disc ml-5 space-y-1 mt-1">
                  <li>🐛 Chat-based check-ins — affirming, trauma-informed</li>
                  <li>🌤 Mood & Thought Logs — reflection without judgment</li>
                  <li>📖 Daily nudges — prompts, reminders, poetic pick-me-ups</li>
                  <li>🎨 Visual growth tracker — show up, and Lilo grows</li>
                  <li>🦋 The Metamorphosis — unlock a pride-colored butterfly</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Voice Style: How Lilo Talks</div>
                <ul className="list-disc ml-5 space-y-1 mt-1">
                  <li>Warmly casual</li>
                  <li>Validating, never “fixing”</li>
                  <li>Bit cheeky: “Butterflies don’t fly straight either.”</li>
                  <li>Philosophically playful</li>
                </ul>
              </div>
              <div className="mt-2">
                <div className="font-medium">Example Onboarding</div>
                <p className="mt-1">
                  “Hi there! I’m Lilo — they/them. I don’t have all the answers, but I’ve got rainbow antennae, and I’m really good at listening. This app is our playground, our space, our Lila. Ready to grow with me?”
                </p>
                <div className="mt-3">
                  <Button
                    onClick={onGetStarted}
                    className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Let’s Begin Lilo’s Lila 🌱
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Staff & Advisors CTA */}
        <section className="mt-16">
          <div className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-sm text-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Staff & Advisors</h2>
            <p className="mt-2">We’re building in partnership with clinicians, researchers, and community leaders.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() => window.location.href = '/press'}
                className="rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
              >
                Meet Our Advisors
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                className="rounded-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
              >
                Partner With Us
              </Button>
            </div>
          </div>
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

export default WhyPridallyPage;