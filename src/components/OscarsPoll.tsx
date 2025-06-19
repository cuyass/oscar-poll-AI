
import React, { useState } from 'react';
import { Award, Star } from 'lucide-react';
import FormStep from './FormStep';
import ProgressBar from './ProgressBar';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { PollData } from '@/types/poll';
import { questions } from '@/constants/questions';

const OscarsPoll = () => {
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [pollData, setPollData] = useState<PollData>({
    bestPicture: '',
    bestActor: '',
    bestActress: '',
    bestDirector: '',
    mostOverrated: '',
    email: ''
  });

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string) => {
    const question = questions[currentStep];
    setPollData(prev => ({
      ...prev,
      [question.id]: value
    }));
    
    // Auto-advance for choice questions
    if (question.type === 'choice') {
      setTimeout(handleNext, 300);
    }
  };

  const handleSubmit = () => {
    console.log('Poll submitted:', pollData);
    handleNext();
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900/20 via-gray-900 to-amber-900/20'
          : 'bg-gradient-to-br from-purple-100/50 via-gray-50 to-amber-100/50'
      }`} />
      
      {/* Theme toggle */}
      <ThemeToggle />
      
      {/* Progress bar */}
      <ProgressBar progress={progress} />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <FormStep
            question={currentQuestion}
            value={pollData[currentQuestion.id as keyof PollData] || ''}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            canGoBack={currentStep > 0 && currentStep < questions.length - 1}
            canGoNext={currentStep < questions.length - 1}
            isLastStep={currentStep === questions.length - 2}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Award className={`w-20 h-20 animate-pulse ${
          isDarkMode ? 'text-amber-400' : 'text-amber-600'
        }`} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Star className={`w-16 h-16 animate-pulse ${
          isDarkMode ? 'text-purple-400' : 'text-purple-600'
        }`} />
      </div>
    </div>
  );
};

export default OscarsPoll;
