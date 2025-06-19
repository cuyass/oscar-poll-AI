
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Award, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

interface FormStepProps {
  question: Question;
  value: string;
  onAnswer: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  question,
  value,
  onAnswer,
  onNext,
  onBack,
  onSubmit,
  canGoBack,
  canGoNext,
  isLastStep
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue);
      if (isLastStep) {
        onSubmit();
      } else {
        onNext();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div className="animate-fade-in">
      {question.type === 'welcome' && (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <Award className="w-24 h-24 text-amber-400 animate-pulse" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              {question.title}
            </h1>
            <p className="text-xl text-gray-300">{question.subtitle}</p>
            <p className="text-gray-400">{question.description}</p>
          </div>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Start Poll <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {question.type === 'choice' && (
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">{question.title}</h2>
            <p className="text-lg text-gray-300">{question.subtitle}</p>
          </div>
          
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all duration-300 border-2 hover:scale-[1.02] ${
                  value === option
                    ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
                }`}
                onClick={() => onAnswer(option)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{option}</span>
                  {value === option && (
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {question.type === 'input' && (
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">{question.title}</h2>
            <p className="text-lg text-gray-300">{question.subtitle}</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type={question.inputType || 'text'}
                placeholder={question.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 py-6 text-lg bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
            
            <Button
              onClick={handleInputSubmit}
              disabled={!inputValue.trim()}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg"
            >
              {isLastStep ? (
                <>Submit Poll <Send className="ml-2 w-5 h-5" /></>
              ) : (
                <>Continue <ChevronRight className="ml-2 w-5 h-5" /></>
              )}
            </Button>
          </div>
        </div>
      )}

      {question.type === 'thanks' && (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <Award className="w-24 h-24 text-amber-400 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
              {question.title}
            </h1>
            <p className="text-xl text-gray-300">{question.subtitle}</p>
            <p className="text-gray-400">{question.description}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      {question.type !== 'welcome' && question.type !== 'thanks' && (
        <div className="flex justify-between mt-12">
          <Button
            onClick={onBack}
            variant="ghost"
            className={`text-gray-400 hover:text-white transition-all duration-300 ${
              canGoBack ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="mr-2 w-4 h-4" /> Back
          </Button>
          
          <div className="text-sm text-gray-500">
            Press Enter ↵
          </div>
        </div>
      )}
    </div>
  );
};

export default FormStep;
