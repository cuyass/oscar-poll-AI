import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FormStep from './FormStep';
import ProgressBar from './ProgressBar';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface PollData {
  bestPicture: string;
  bestActor: string;
  bestActress: string;
  bestDirector: string;
  mostOverrated: string;
  email: string;
}

interface Question {
  id: string;
  type: 'welcome' | 'choice' | 'input' | 'thanks';
  title: string;
  subtitle: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  inputType?: string;
}

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

  const questions: Question[] = [
    {
      id: 'welcome',
      type: 'welcome' as const,
      title: 'Oscars 2025 Poll',
      subtitle: 'Share your predictions for the biggest night in Hollywood',
      description: 'This will take about 2 minutes to complete.'
    },
    {
      id: 'bestPicture',
      type: 'choice' as const,
      title: 'Who will win Best Picture?',
      subtitle: 'Choose your top pick for the most prestigious award',
      options: [
        'Dune: Part Two',
        'Oppenheimer',
        'Killers of the Flower Moon',
        'Poor Things',
        'The Zone of Interest',
        'Barbie'
      ]
    },
    {
      id: 'bestActor',
      type: 'choice' as const,
      title: 'Best Actor in a Leading Role?',
      subtitle: 'Who deserves the golden statue?',
      options: [
        'Cillian Murphy - Oppenheimer',
        'Paul Giamatti - The Holdovers',
        'Bradley Cooper - Maestro',
        'Colman Domingo - Rustin',
        'Jeffrey Wright - American Fiction'
      ]
    },
    {
      id: 'bestActress',
      type: 'choice' as const,
      title: 'Best Actress in a Leading Role?',
      subtitle: 'Your prediction for the leading lady',
      options: [
        'Emma Stone - Poor Things',
        'Carey Mulligan - Maestro',
        'Sandra Hüller - Anatomy of a Fall',
        'Margot Robbie - Barbie',
        'Lily Gladstone - Killers of the Flower Moon'
      ]
    },
    {
      id: 'bestDirector',
      type: 'choice' as const,
      title: 'Best Director?',
      subtitle: 'Who will take home the directing prize?',
      options: [
        'Christopher Nolan - Oppenheimer',
        'Martin Scorsese - Killers of the Flower Moon',
        'Yorgos Lanthimos - Poor Things',
        'Justine Triet - Anatomy of a Fall',
        'Jonathan Glazer - The Zone of Interest'
      ]
    },
    {
      id: 'mostOverrated',
      type: 'choice' as const,
      title: 'Most overrated nomination?',
      subtitle: 'Which film do you think doesn\'t deserve the hype?',
      options: [
        'Barbie',
        'Oppenheimer',
        'Poor Things',
        'Maestro',
        'The Zone of Interest',
        'None - they all deserve it!'
      ]
    },
    {
      id: 'email',
      type: 'input' as const,
      title: 'What\'s your email?',
      subtitle: 'We\'ll send you the results after the ceremony',
      placeholder: 'your@email.com',
      inputType: 'email'
    },
    {
      id: 'thanks',
      type: 'thanks' as const,
      title: 'Thank you! 🏆',
      subtitle: 'Your predictions have been recorded',
      description: 'We\'ll email you the results after the Oscars ceremony on March 10th, 2025.'
    }
  ];

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
