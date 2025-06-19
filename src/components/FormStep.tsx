
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Award, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/poll';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { isDarkMode } = useTheme();
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
            <Award className="w-24 h-24 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
              {question.title}
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {question.subtitle}
            </p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {question.description}
            </p>
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
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {question.title}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {question.subtitle}
            </p>
          </div>
          
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all duration-300 border-2 hover:scale-[1.02] ${
                  value === option
                    ? isDarkMode 
                      ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20'
                      : 'border-amber-500 bg-amber-50 shadow-lg shadow-amber-500/20'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
                      : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                }`}
                onClick={() => onAnswer(option)}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option}
                  </span>
                  {value === option && (
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      isDarkMode ? 'bg-amber-400' : 'bg-amber-500'
                    }`} />
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
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {question.title}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {question.subtitle}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                type={question.inputType || 'text'}
                placeholder={question.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`pl-12 py-6 text-lg border-2 focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-500'
                }`}
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
              <Award className="w-24 h-24 text-amber-500 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-amber-500 bg-clip-text text-transparent">
              {question.title}
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {question.subtitle}
            </p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {question.description}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      {question.type !== 'welcome' && question.type !== 'thanks' && (
        <div className="flex justify-between mt-12">
          <Button
            onClick={onBack}
            variant="ghost"
            className={`transition-all duration-300 ${
              canGoBack 
                ? isDarkMode 
                  ? 'text-gray-400 hover:text-white opacity-100' 
                  : 'text-gray-600 hover:text-gray-900 opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="mr-2 w-4 h-4" /> Back
          </Button>
          
          <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Press Enter ↵
          </div>
        </div>
      )}
    </div>
  );
};

export default FormStep;
