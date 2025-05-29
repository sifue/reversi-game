import React from 'react';
import { Player, GameStatus } from '../types/game';

interface GameInfoProps {
  currentPlayer: Player;
  blackScore: number;
  whiteScore: number;
  gameStatus: GameStatus;
  winner: Player | 'tie' | null;
  onRestart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  blackScore,
  whiteScore,
  gameStatus,
  winner,
  onRestart
}) => {
  const getPlayerDisplay = (player: Player) => {
    return player === 'black' ? '黒' : '白';
  };

  const getWinnerMessage = () => {
    if (winner === 'tie') return '引き分け！';
    if (winner) return `${getPlayerDisplay(winner)}の勝利！`;
    return '';
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-6">
      {/* スコア表示 */}
      <div className="flex space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-700"></div>
          <span className="text-xl font-bold">黒: {blackScore}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300"></div>
          <span className="text-xl font-bold">白: {whiteScore}</span>
        </div>
      </div>

      {/* 手番表示またはゲーム結果 */}
      {gameStatus === 'playing' ? (
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <div className={`w-4 h-4 rounded-full ${currentPlayer === 'black' ? 'bg-black' : 'bg-white border border-gray-300'}`}></div>
          <span>{getPlayerDisplay(currentPlayer)}の手番</span>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-4">
            ゲーム終了
          </div>
          <div className="text-xl font-semibold mb-4">
            {getWinnerMessage()}
          </div>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            新しいゲーム
          </button>
        </div>
      )}
    </div>
  );
};

export default GameInfo;