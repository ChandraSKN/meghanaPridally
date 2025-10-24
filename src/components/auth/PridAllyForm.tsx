import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Users, Heart, ArrowRight } from 'lucide-react';

interface PridAllyFormProps {
  onBack: () => void;
  onPrydAccess?: () => void;
  onAllyAccess?: () => void;
}

const PridAllyForm: React.FC<PridAllyFormProps> = ({ onBack, onPrydAccess, onAllyAccess }) => {
  const { signin } = useAuth();
  const { toast } = useToast();

  const handlePathwaySelection = async (pathway: 'pryd' | 'ally') => {
    try {
      if (pathway === 'pryd' && onPrydAccess) {
        // For Pryd Access, redirect to gender identity form with full options
        onPrydAccess();
      } else if (pathway === 'ally' && onAllyAccess) {
        // For Ally Access, redirect to gender identity form with simplified options
        onAllyAccess();
      } else {
        // Fallback - shouldn't reach here with current setup
        toast({
          title: `Welcome to ${pathway === 'ally' ? 'Ally' : 'Pryd'} Access!`,
          description: `You've selected the ${pathway === 'ally' ? 'Ally' : 'Pryd'} pathway. Redirecting to your dashboard...`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your <span className="text-purple-600">Pathway</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Select the access type that best represents your journey with us
          </p>
        </div>

        {/* Main Card Container */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-purple-100">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 relative">
              
              {/* Pryd Access */}
              <div className="relative">
                <Card className="border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800">Pryd Access</h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm">
                      For LGBTQIA+ community members seeking personalized health and wellness support
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-700">Complete wellness assessment</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-gray-700">Personalized care recommendations</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-700">Community connection features</span>
                      </div>
                    </div>
                    
                    {/* Button */}
                    <Button 
                      onClick={() => handlePathwaySelection('pryd')}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Continue as Community Member</span>
                      <Users className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Arrow pointing right (hidden on mobile) */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                <div className="bg-white rounded-full p-3 shadow-lg border">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>

              {/* Ally Access */}
              <div className="relative">
                <Card className="border-2 border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800">Ally Access</h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm">
                      For supportive partners, family, and friends committed to inclusive care
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-700">Allyship resources & education</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span className="text-gray-700">Care-giver communication tools</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span className="text-gray-700">Partner journey insights (with permission)</span>
                      </div>
                    </div>
                    
                    {/* Button */}
                    <Button 
                      onClick={() => handlePathwaySelection('ally')}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Continue as Ally</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-500 text-sm">
            Both pathways lead to a safe, supportive environment designed with evidence-informed care principles.
          </p>
          
          <Button
            variant="outline"
            onClick={onBack}
            className="border-gray-300 hover:bg-gray-50 text-gray-600"
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PridAllyForm;