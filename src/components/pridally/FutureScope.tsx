import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Bot, HeartHandshake } from 'lucide-react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

interface FutureScopePageProps {
  onGetStarted: () => void;
}

const roadmapCards = [
  {
    key: 'progress-visualizer',
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Progress Visualizer',
    description:
      'See your daily check-ins turn into trends over time - mood, energy, sleep, and more, charted so patterns become visible instead of scattered across separate days.',
    bgGradient: 'from-purple-500 to-indigo-600',
    label: 'COMING SOON',
    labelColor: 'text-purple-600/80',
  },
  {
    key: 'friendly-ai',
    icon: <Bot className="h-8 w-8" />,
    title: 'Your Friendly AI',
    description:
      'A warm, judgement-free companion that helps you make sense of your check-ins, answers questions, and gently nudges you toward the resources that fit where you are today.',
    bgGradient: 'from-pink-500 to-rose-600',
    label: 'COMING SOON',
    labelColor: 'text-pink-600/80',
  },
  {
    key: 'share-experience',
    icon: <HeartHandshake className="h-8 w-8" />,
    title: 'Share Your Experience',
    description:
      'A safe, moderated space to share your journey with the PRIDalLY community - on your terms, at your pace, with as much or as little detail as you choose.',
    bgGradient: 'from-teal-500 to-emerald-600',
    label: 'COMING SOON',
    labelColor: 'text-teal-600/80',
  },
];

const FutureScopePage: React.FC<FutureScopePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <SiteHeader onGetStarted={onGetStarted} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400" />

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                What&apos;s Next
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Future Scope
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                A look at what we&apos;re building next - designed with the community, not just for it.
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Roadmap Cards Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">On the Roadmap</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three features we&apos;re actively exploring for future releases.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {roadmapCards.map((card) => (
                <Card
                  key={card.key}
                  className="group h-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.bgGradient} text-white mb-6`}>
                      {card.icon}
                    </div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${card.labelColor}`}>
                      {card.label}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default FutureScopePage;
