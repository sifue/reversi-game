import React, { useEffect, useState } from 'react';

interface GameStartAnimationProps {
  onAnimationComplete: () => void;
}

const GameStartAnimation: React.FC<GameStartAnimationProps> = ({ onAnimationComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 500);
    const timer2 = setTimeout(() => setCurrentStep(2), 1500);
    const timer3 = setTimeout(() => setCurrentStep(3), 2500);
    const timer4 = setTimeout(() => onAnimationComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className={`text-6xl font-bold mb-8 transition-all duration-1000 ${
          currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          オセロゲーム
        </div>
        
        <div className={`flex justify-center space-x-4 mb-8 transition-all duration-1000 delay-500 ${
          currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="w-16 h-16 bg-black rounded-full shadow-lg animate-bounce"></div>
          <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 shadow-lg animate-bounce delay-200"></div>
        </div>
        
        <div className={`text-2xl font-semibold text-gray-700 transition-all duration-1000 delay-1000 ${
          currentStep >= 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          ゲーム開始！
        </div>
      </div>
    </div>
  );
};

export default GameStartAnimation;