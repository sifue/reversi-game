import { useState, useCallback, useEffect } from 'react';
import { GameState, Player } from '../types/game';
import {
  createInitialBoard,
  makeMove,
  getAllValidMoves,
  calculateScore,
  isGameOver,
  getWinner,
  getOpponent,
  isValidMove
} from '../utils/gameLogic';

export const useReversiGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board = createInitialBoard();
    const { black, white } = calculateScore(board);
    const validMoves = getAllValidMoves(board, 'black');
    
    return {
      board,
      currentPlayer: 'black' as Player,
      status: 'playing' as const,
      blackScore: black,
      whiteScore: white,
      validMoves: validMoves.map(move => [move.row, move.col])
    };
  });

  const makePlayerMove = useCallback((row: number, col: number) => {
    if (gameState.status !== 'playing') return;
    
    if (!isValidMove(gameState.board, row, col, gameState.currentPlayer)) {
      return;
    }

    const newBoard = makeMove(gameState.board, row, col, gameState.currentPlayer);
    const { black, white } = calculateScore(newBoard);
    const nextPlayer = getOpponent(gameState.currentPlayer);
    const nextValidMoves = getAllValidMoves(newBoard, nextPlayer);
    
    let finalPlayer = nextPlayer;
    let finalBoard = newBoard;
    let finalValidMoves = nextValidMoves;

    if (nextValidMoves.length === 0) {
      const currentPlayerMoves = getAllValidMoves(newBoard, gameState.currentPlayer);
      if (currentPlayerMoves.length > 0) {
        finalPlayer = gameState.currentPlayer;
        finalValidMoves = currentPlayerMoves;
      }
    }

    const gameOver = isGameOver(finalBoard);
    
    setGameState({
      board: finalBoard,
      currentPlayer: finalPlayer,
      status: gameOver ? 'gameOver' : 'playing',
      blackScore: black,
      whiteScore: white,
      validMoves: finalValidMoves.map(move => [move.row, move.col])
    });
  }, [gameState]);

  const restartGame = useCallback(() => {
    const board = createInitialBoard();
    const { black, white } = calculateScore(board);
    const validMoves = getAllValidMoves(board, 'black');
    
    setGameState({
      board,
      currentPlayer: 'black',
      status: 'playing',
      blackScore: black,
      whiteScore: white,
      validMoves: validMoves.map(move => [move.row, move.col])
    });
  }, []);

  const winner = gameState.status === 'gameOver' ? getWinner(gameState.board) : null;

  return {
    gameState,
    makePlayerMove,
    restartGame,
    winner
  };
};