import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Sparkles } from 'lucide-react';

interface GenderIdentityFormProps {
  onBack: () => void;
  pathwayType?: 'pryd' | 'ally';
  onComplete?: () => void;
}

const GenderIdentityForm: React.FC<GenderIdentityFormProps> = ({ onBack, pathwayType = 'pryd', onComplete }) => {
  const [preferredName, setPreferredName] = useState('');
  const [selectedPronouns, setSelectedPronouns] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const pronounOptions = pathwayType === 'ally' 
    ? ['Male', 'Female']
    : [
        'she/her',
        'he/him', 
        'they/them',
        'ze/zir',
        'xe/xem',
        'other/ask me'
      ];

  const ageRanges = [
    '13-17',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preferredName || !selectedPronouns || !ageRange) {
      toast({
        title: "Please complete all fields",
        description: "We need this information to personalize your experience.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would save this data to your backend
      const profileData = {
        preferredName,
        pronouns: selectedPronouns,
        ageRange,
        pathway: pathwayType
      };
      
      // Store locally for now
      localStorage.setItem('pridally_profile', JSON.stringify(profileData));
      
      toast({
        title: "Profile completed!",
        description: "Welcome to your personalized PRIDALLY experience.",
      });
      
      // Complete the onboarding flow and redirect to daily feedback
      if (onComplete) {
        onComplete();
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePronounSelect = (pronoun: string) => {
    setSelectedPronouns(pronoun);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card/90 backdrop-blur-sm shadow-strong animate-scale-in">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6 animate-float">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Let's get to know <span className="text-primary">you</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {pathwayType === 'ally' 
                ? 'Help us provide you with the most relevant ally resources and support information'
                : 'Help us personalize your PRIDALLY experience with just a few details about yourself'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Preferred Name */}
            <div className="space-y-2">
              <Label htmlFor="preferredName" className="flex items-center text-base font-semibold">
                What would you like us to call you? 
                <Sparkles className="h-4 w-4 ml-2 text-primary animate-pulse" />
              </Label>
              <div className="relative group">
                <Input
                  id="preferredName"
                  type="text"
                  placeholder="Your preferred name (this can be anything you'd like!)"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="bg-background/70 border-2 border-border/50 focus:border-primary focus:bg-background transition-all duration-300 hover:border-border group-hover:shadow-soft rounded-lg px-4 py-3"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <p className="text-sm text-muted-foreground/80">
                This is how we'll address you throughout your journey. Choose whatever feels right for you.
              </p>
            </div>

            {/* Pronouns/Gender */}
            <div className="space-y-4">
              <Label className="flex items-center text-base font-semibold">
                {pathwayType === 'ally' ? 'What is your gender?' : 'What are your pronouns?'}
                <span className="text-xl ml-2 animate-bounce" style={{ animationDuration: '2s' }}>🏳️‍🌈</span>
              </Label>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pronounOptions.map((pronoun, index) => (
                  <Button
                    key={pronoun}
                    type="button"
                    variant="ghost"
                    onClick={() => handlePronounSelect(pronoun)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 group ${
                      selectedPronouns === pronoun
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary shadow-lg scale-105'
                        : 'border-border/30 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent text-foreground bg-background/30 backdrop-blur-sm'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="relative z-10 font-medium">{pronoun}</span>
                    {selectedPronouns === pronoun && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 animate-pulse" />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground/80">
                {pathwayType === 'ally' 
                  ? 'This helps us provide relevant resources and support information. You can update this anytime.'
                  : 'Your pronouns help us communicate with you respectfully. You can update these anytime.'
                }
              </p>
            </div>

            {/* Age Range */}
            <div className="space-y-2">
              <Label htmlFor="ageRange" className="flex items-center text-base font-semibold">
                What's your age range? 
                <span className="text-xl ml-2 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>🎂</span>
              </Label>
              <div className="relative group">
                <Select value={ageRange} onValueChange={setAgeRange}>
                  <SelectTrigger className="bg-background/70 border-2 border-border/50 focus:border-primary hover:border-border transition-all duration-300 group-hover:shadow-soft rounded-lg px-4 py-3 h-12">
                    <SelectValue placeholder="Select your age range" className="text-muted-foreground/60" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50 bg-card/95 backdrop-blur-xl shadow-strong">
                    {ageRanges.map((range) => (
                      <SelectItem 
                        key={range} 
                        value={range}
                        className="px-4 py-3 rounded-lg focus:bg-primary/10 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <p className="text-sm text-muted-foreground/80">
                This helps us provide age-appropriate resources and recommendations.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={loading || !preferredName || !selectedPronouns || !ageRange}
                className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-4 rounded-xl text-lg transition-all duration-500 shadow-medium hover:shadow-strong hover:scale-[1.02] group disabled:opacity-50 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold">
                  {loading ? 'Setting up your profile...' : 'Continue to Mood Check'}
                  <Sparkles className={`h-5 w-5 text-white ${loading ? 'animate-spin' : 'animate-pulse'}`} />
                </span>
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary text-lg animate-pulse">💖</span>
              <p className="text-base font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                You're doing great!
              </p>
            </div>
            <p className="text-xs text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
              Every step you take is an act of self-care. We're honored to be part of your journey.
            </p>
            
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full border-2 border-border/30 hover:border-border hover:bg-gradient-to-r hover:from-secondary/20 hover:to-transparent transition-all duration-300 rounded-xl py-3 backdrop-blur-sm hover:scale-105"
            >
              Back to Pathway Selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenderIdentityForm;