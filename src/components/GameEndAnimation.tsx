import React, { useEffect, useState } from 'react';
import { Player } from '../types/game';

interface GameEndAnimationProps {
  winner: Player | 'tie' | null;
  blackScore: number;
  whiteScore: number;
  onAnimationComplete: () => void;
}

const GameEndAnimation: React.FC<GameEndAnimationProps> = ({ 
  winner, 
  blackScore, 
  whiteScore, 
  onAnimationComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 500);
    const timer2 = setTimeout(() => setCurrentStep(2), 1500);
    const timer3 = setTimeout(() => setCurrentStep(3), 2500);
    const timer4 = setTimeout(() => onAnimationComplete(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onAnimationComplete]);

  const getWinnerMessage = () => {
    if (winner === 'tie') return '引き分け！';
    if (winner === 'black') return '黒の勝利！';
    if (winner === 'white') return '白の勝利！';
    return 'ゲーム終了';
  };

  const getWinnerColor = () => {
    if (winner === 'black') return 'text-gray-800';
    if (winner === 'white') return 'text-gray-600';
    return 'text-green-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className={`text-4xl font-bold mb-6 transition-all duration-1000 ${
          currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          ゲーム終了
        </div>
        
        <div className={`mb-6 transition-all duration-1000 delay-500 ${
          currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full mx-auto mb-2"></div>
              <div className="text-2xl font-bold">{blackScore}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-300 mx-auto mb-2"></div>
              <div className="text-2xl font-bold">{whiteScore}</div>
            </div>
          </div>
        </div>
        
        <div className={`text-3xl font-bold mb-6 ${getWinnerColor()} transition-all duration-1000 delay-1000 ${
          currentStep >= 3 ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`}>
          {getWinnerMessage()}
        </div>

        {winner && winner !== 'tie' && (
          <div className={`transition-all duration-1000 delay-1000 ${
            currentStep >= 3 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className={`w-20 h-20 rounded-full mx-auto animate-bounce ${
              winner === 'black' ? 'bg-black' : 'bg-white border-4 border-gray-300'
            }`}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameEndAnimation;