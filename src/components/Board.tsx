import React from 'react';
import { Board as BoardType, Player } from '../types/game';
import Cell from './Cell';

interface BoardProps {
  board: BoardType;
  validMoves: number[][];
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
}

const Board: React.FC<BoardProps> = ({ board, validMoves, onCellClick, currentPlayer }) => {
  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="grid grid-cols-8 gap-1 bg-green-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-2xl mx-auto w-fit">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            isValidMove={isValidMove(rowIndex, colIndex)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            currentPlayer={currentPlayer}
          />
        ))
      )}
    </div>
  );
};

export default Board;