
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className={`h-1 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
