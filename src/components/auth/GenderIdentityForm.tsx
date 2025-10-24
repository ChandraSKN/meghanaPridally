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
}

const GenderIdentityForm: React.FC<GenderIdentityFormProps> = ({ onBack, pathwayType = 'pryd' }) => {
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
      
      // This will complete the authentication flow and redirect to Dashboard
      
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Let's get to know <span className="text-purple-600">you</span>
          </h1>
          <p className="text-gray-600 text-lg">
            {pathwayType === 'ally' 
              ? 'Help us provide you with the most relevant ally resources and support information'
              : 'Help us personalize your PRIDALLY experience with just a few details about yourself'
            }
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Preferred Name */}
              <div className="space-y-3">
                <Label htmlFor="preferredName" className="text-lg font-medium text-gray-800 flex items-center">
                  What would you like us to call you? 
                  <Sparkles className="h-4 w-4 ml-2 text-yellow-500" />
                </Label>
                <Input
                  id="preferredName"
                  type="text"
                  placeholder="Your preferred name (this can be anything you'd like!)"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="text-lg p-4 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                />
                <p className="text-sm text-gray-500">
                  This is how we'll address you throughout your journey. Choose whatever feels right for you.
                </p>
              </div>

              {/* Pronouns/Gender */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-gray-800 flex items-center">
                  {pathwayType === 'ally' ? 'What is your gender?' : 'What are your pronouns?'}
                  <span className="text-2xl ml-2">🏳️‍🌈</span>
                </Label>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {pronounOptions.map((pronoun) => (
                    <Button
                      key={pronoun}
                      type="button"
                      variant={selectedPronouns === pronoun ? "default" : "outline"}
                      onClick={() => handlePronounSelect(pronoun)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPronouns === pronoun
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700'
                      }`}
                    >
                      {pronoun}
                    </Button>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500">
                  {pathwayType === 'ally' 
                    ? 'This helps us provide relevant resources and support information. You can update this anytime.'
                    : 'Your pronouns help us communicate with you respectfully. You can update these anytime.'
                  }
                </p>
              </div>

              {/* Age Range */}
              <div className="space-y-3">
                <Label htmlFor="ageRange" className="text-lg font-medium text-gray-800 flex items-center">
                  What's your age range? 
                  <span className="text-2xl ml-2">🎂</span>
                </Label>
                <Select value={ageRange} onValueChange={setAgeRange}>
                  <SelectTrigger className="text-lg p-4 border-2 border-purple-200 focus:border-purple-400 rounded-xl">
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map((range) => (
                      <SelectItem key={range} value={range} className="text-lg p-3">
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  This helps us provide age-appropriate resources and recommendations.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading || !preferredName || !selectedPronouns || !ageRange}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-4 rounded-xl text-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Setting up your profile...' : 'Continue to Mood Check'}</span>
                <Sparkles className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-pink-500">💖</span>
            <span className="text-sm">You're doing great!</span>
          </div>
          <p className="text-xs text-gray-500">
            Every step you take is an act of self-care. We're honored to be part of your journey.
          </p>
          
          <Button
            variant="outline"
            onClick={onBack}
            className="border-gray-300 hover:bg-gray-50 text-gray-600 mt-4"
          >
            Back to Pathway Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenderIdentityForm;