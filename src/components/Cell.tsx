import React from 'react';
import { CellState, Player } from '../types/game';

interface CellProps {
  value: CellState;
  isValidMove: boolean;
  onClick: () => void;
  currentPlayer: Player;
}

const Cell: React.FC<CellProps> = ({ value, isValidMove, onClick, currentPlayer }) => {
  const getCellContent = () => {
    if (value === 'black') {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black rounded-full border-2 border-gray-700 shadow-lg transition-all duration-300 hover:scale-105" />
      );
    }
    
    if (value === 'white') {
      return (
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-gray-300 shadow-lg transition-all duration-300 hover:scale-105" />
      );
    }
    
    if (isValidMove) {
      return (
        <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-dashed opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${
          currentPlayer === 'black' 
            ? 'border-black bg-black bg-opacity-20' 
            : 'border-white bg-white bg-opacity-30'
        }`} />
      );
    }
    
    return null;
  };

  return (
    <div
      className={`
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
        bg-green-600 
        flex items-center justify-center 
        rounded border border-green-700
        transition-all duration-200
        ${isValidMove ? 'hover:bg-green-500 cursor-pointer transform hover:scale-105' : ''}
      `}
      onClick={isValidMove ? onClick : undefined}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;