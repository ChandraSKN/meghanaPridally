import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useHealth, HealthMetric } from '@/contexts/HealthContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, CheckCircle2, Heart, Brain, Users, Baby, Activity } from 'lucide-react';

interface DailyCheckInProps {
  onComplete: () => void;
  focusCategory?: string | null;
}

type HealthSection = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  questions: any[];
};

const DailyCheckIn: React.FC<DailyCheckInProps> = ({ onComplete, focusCategory = null }) => {
  const { metrics, submitDailyEntry } = useHealth();
  const { toast } = useToast();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  // Define all health sections with their respective questions
  const allHealthSections: HealthSection[] = [
    {
      id: 'sexual-health',
      name: 'Sexual Health',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      questions: metrics.find(m => m.name.toLowerCase().includes('sexual'))?.questions || 
                metrics[0]?.questions.slice(0, 2) || []
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      icon: <Brain className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      questions: metrics.find(m => m.name.toLowerCase().includes('mental'))?.questions || 
                metrics[1]?.questions.slice(0, 3) || []
    },
    {
      id: 'reproductive-health',
      name: 'Reproductive Health',
      icon: <Baby className="h-5 w-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      questions: metrics.find(m => m.name.toLowerCase().includes('reproductive'))?.questions || 
                metrics[2]?.questions.slice(0, 2) || []
    },
    {
      id: 'social-health',
      name: 'Social Health',
      icon: <Users className="h-5 w-5" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      questions: metrics.find(m => m.name.toLowerCase().includes('social'))?.questions || 
                metrics[3]?.questions.slice(0, 3) || []
    },
    {
      id: 'physical-health',
      name: 'Physical Health',
      icon: <Activity className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      questions: metrics.find(m => m.name.toLowerCase().includes('physical'))?.questions || 
                metrics[4]?.questions.slice(0, 2) || []
    }
  ];

  // Filter sections based on focusCategory
  const healthSections = focusCategory 
    ? allHealthSections.filter(section => section.name === focusCategory)
    : allHealthSections;

  // Set initial section index when focusCategory changes
  useEffect(() => {
    if (focusCategory) {
      const focusIndex = allHealthSections.findIndex(section => section.name === focusCategory);
      if (focusIndex !== -1) {
        setCurrentSectionIndex(0); // Always start at index 0 for filtered sections
        setCurrentPanelIndex(0);
      }
    } else {
      setCurrentSectionIndex(0);
      setCurrentPanelIndex(0);
    }
  }, [focusCategory]);

  const currentSection = healthSections[currentSectionIndex];
  const questionsPerPanel = 2; // Split questions into panels of 2
  const totalPanels = Math.ceil(currentSection.questions.length / questionsPerPanel);
  const currentQuestions = currentSection.questions.slice(
    currentPanelIndex * questionsPerPanel,
    (currentPanelIndex + 1) * questionsPerPanel
  );

  const handleQuestionResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isCurrentPanelComplete = () => {
    return currentQuestions.every(
      question => responses[question.id] !== undefined
    );
  };

  const isCurrentSectionComplete = () => {
    return currentSection.questions.every(
      question => responses[question.id] !== undefined
    );
  };

  const handleNext = () => {
    if (currentPanelIndex < totalPanels - 1) {
      // Move to next panel in current section
      setCurrentPanelIndex(prev => prev + 1);
    } else {
      // Move to next section
      if (isCurrentSectionComplete()) {
        setCompletedSections(prev => new Set([...prev, currentSectionIndex]));
      }
      
      if (currentSectionIndex < healthSections.length - 1) {
        setCurrentSectionIndex(prev => prev + 1);
        setCurrentPanelIndex(0);
      } else {
        // Complete the check-in
        submitDailyEntry(responses);
        toast({
          title: "Daily check-in completed! 🎉",
          description: "Great job tracking your health today. Keep up the good work!",
        });
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = healthSections[currentSectionIndex - 1];
      const prevTotalPanels = Math.ceil(prevSection.questions.length / questionsPerPanel);
      setCurrentPanelIndex(prevTotalPanels - 1);
    }
  };

  const handleSectionClick = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentPanelIndex(0);
  };

  const getSectionProgress = (sectionIndex: number) => {
    const section = healthSections[sectionIndex];
    const answered = section.questions.filter(q => responses[q.id] !== undefined).length;
    return Math.round((answered / section.questions.length) * 100);
  };

  const renderQuestion = (question: any) => {
    const currentValue = responses[question.id];

    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={question.id} className="text-base font-medium">
                {question.question}
              </Label>
              <div className="px-4 py-6">
                <Slider
                  id={question.id}
                  min={question.scale.min}
                  max={question.scale.max}
                  step={1}
                  value={currentValue ? [currentValue] : [Math.floor((question.scale.min + question.scale.max) / 2)]}
                  onValueChange={(value) => handleQuestionResponse(question.id, value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{question.scale.labels[0]}</span>
                  <span className="font-semibold text-primary">
                    {currentValue || Math.floor((question.scale.min + question.scale.max) / 2)}
                  </span>
                  <span>{question.scale.labels[question.scale.labels.length - 1]}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'boolean':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">{question.question}</Label>
            <div className="flex space-x-4">
              <Button
                variant={currentValue === true ? 'default' : 'outline'}
                onClick={() => handleQuestionResponse(question.id, true)}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                variant={currentValue === false ? 'default' : 'outline'}
                onClick={() => handleQuestionResponse(question.id, false)}
                className="flex-1"
              >
                No
              </Button>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <Label htmlFor={question.id} className="text-base font-medium">
              {question.question}
            </Label>
            <Textarea
              id={question.id}
              placeholder="Share your thoughts..."
              value={currentValue || ''}
              onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r shadow-sm">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">
            {focusCategory ? `${focusCategory} Check-in` : 'Daily Check-in'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {focusCategory 
              ? `Focus on your ${focusCategory.toLowerCase()} wellness` 
              : 'Complete your wellness assessment'
            }
          </p>
        </div>

        {/* Health Sections */}
        <div className="p-4 space-y-3">
          {healthSections.map((section, index) => {
            const progress = getSectionProgress(index);
            const isActive = index === currentSectionIndex;
            const isCompleted = completedSections.has(index);
            
            return (
              <Card 
                key={section.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isActive ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSectionClick(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${section.bgColor}`}>
                        <div className={section.color}>
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{section.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {section.questions.length} questions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      <Badge variant={progress === 100 ? "default" : "outline"} className="text-xs">
                        {progress}%
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1.5 mt-3">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Overall Progress */}
        <div className="p-4 border-t mt-auto">
          <div className="text-sm font-medium mb-2">Overall Progress</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedSections.size / healthSections.length) * 100}%` 
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {completedSections.size} of {healthSections.length} sections completed
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${currentSection.bgColor}`}>
                <div className={currentSection.color}>
                  {currentSection.icon}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentSection.name}</h1>
                <p className="text-muted-foreground">
                  Panel {currentPanelIndex + 1} of {totalPanels}
                </p>
              </div>
            </div>
            <Badge variant="outline">
              {getSectionProgress(currentSectionIndex)}% Complete
            </Badge>
          </div>
        </div>

        {/* Questions Panel */}
        <div className="flex-1 relative">
          <div className="h-full overflow-y-auto pb-24 p-6">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-medium">
                <CardContent className="p-8 space-y-8">
                  {currentQuestions.map((question, index) => (
                    <div 
                      key={question.id} 
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {renderQuestion(question)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fixed Navigation */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-card/95 backdrop-blur-sm shadow-lg">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0 && currentPanelIndex === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPanels }, (_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentPanelIndex
                        ? 'bg-primary'
                        : index < currentPanelIndex
                        ? 'bg-success'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!isCurrentPanelComplete()}
                className="flex items-center space-x-2 bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                {currentSectionIndex === healthSections.length - 1 && currentPanelIndex === totalPanels - 1 ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Complete Check-in</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;