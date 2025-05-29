import React, { useState, useEffect } from 'react';
import { useReversiGame } from '../hooks/useReversiGame';
import Board from './Board';
import GameInfo from './GameInfo';
import GameEndAnimation from './GameEndAnimation';

const ReversiGame: React.FC = () => {
  const { gameState, makePlayerMove, restartGame, winner } = useReversiGame();
  const [showEndAnimation, setShowEndAnimation] = useState(false);

  useEffect(() => {
    if (gameState.status === 'gameOver' && !showEndAnimation) {
      setShowEndAnimation(true);
    }
  }, [gameState.status, showEndAnimation]);

  const handleEndAnimationComplete = () => {
    setShowEndAnimation(false);
  };

  const handleRestart = () => {
    setShowEndAnimation(false);
    restartGame();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 sm:space-y-6">
      {showEndAnimation && (
        <GameEndAnimation
          winner={winner}
          blackScore={gameState.blackScore}
          whiteScore={gameState.whiteScore}
          onAnimationComplete={handleEndAnimationComplete}
        />
      )}
      
      <GameInfo
        currentPlayer={gameState.currentPlayer}
        blackScore={gameState.blackScore}
        whiteScore={gameState.whiteScore}
        gameStatus={gameState.status}
        winner={winner}
        onRestart={handleRestart}
      />
      
      <div className="flex-shrink-0">
        <Board
          board={gameState.board}
          validMoves={gameState.validMoves}
          onCellClick={makePlayerMove}
          currentPlayer={gameState.currentPlayer}
        />
      </div>
      
      {gameState.status === 'playing' && gameState.validMoves.length === 0 && (
        <div className="text-center p-3 bg-yellow-100 rounded-lg max-w-xs">
          <p className="text-sm sm:text-base font-semibold text-yellow-800">
            {gameState.currentPlayer === 'black' ? '黒' : '白'}は打てる場所がありません
          </p>
          <p className="text-xs sm:text-sm text-yellow-600">
            相手の手番に移ります
          </p>
        </div>
      )}
    </div>
  );
};

export default ReversiGame;