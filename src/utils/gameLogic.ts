import { Board, Player, Position } from '../types/game';

export const BOARD_SIZE = 8;

export const createInitialBoard = (): Board => {
  const board: Board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  
  return board;
};

export const getOpponent = (player: Player): Player => {
  return player === 'black' ? 'white' : 'black';
};

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

export const getFlippedPieces = (
  board: Board, 
  row: number, 
  col: number, 
  player: Player
): Position[] => {
  if (board[row][col] !== null) return [];
  
  const opponent = getOpponent(player);
  const flippedPieces: Position[] = [];
  
  for (const [dr, dc] of directions) {
    const piecesToFlip: Position[] = [];
    let r = row + dr;
    let c = col + dc;
    
    while (isValidPosition(r, c) && board[r][c] === opponent) {
      piecesToFlip.push({ row: r, col: c });
      r += dr;
      c += dc;
    }
    
    if (isValidPosition(r, c) && board[r][c] === player && piecesToFlip.length > 0) {
      flippedPieces.push(...piecesToFlip);
    }
  }
  
  return flippedPieces;
};

export const isValidMove = (
  board: Board, 
  row: number, 
  col: number, 
  player: Player
): boolean => {
  return getFlippedPieces(board, row, col, player).length > 0;
};

export const getAllValidMoves = (board: Board, player: Player): Position[] => {
  const validMoves: Position[] = [];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push({ row, col });
      }
    }
  }
  
  return validMoves;
};

export const makeMove = (
  board: Board, 
  row: number, 
  col: number, 
  player: Player
): Board => {
  const newBoard = board.map(row => [...row]);
  const flippedPieces = getFlippedPieces(board, row, col, player);
  
  if (flippedPieces.length === 0) {
    return board;
  }
  
  newBoard[row][col] = player;
  
  for (const { row: r, col: c } of flippedPieces) {
    newBoard[r][c] = player;
  }
  
  return newBoard;
};

export const calculateScore = (board: Board): { black: number; white: number } => {
  let black = 0;
  let white = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') black++;
      else if (board[row][col] === 'white') white++;
    }
  }
  
  return { black, white };
};

export const isGameOver = (board: Board): boolean => {
  const blackMoves = getAllValidMoves(board, 'black');
  const whiteMoves = getAllValidMoves(board, 'white');
  
  return blackMoves.length === 0 && whiteMoves.length === 0;
};

export const getWinner = (board: Board): Player | 'tie' | null => {
  if (!isGameOver(board)) return null;
  
  const { black, white } = calculateScore(board);
  
  if (black > white) return 'black';
  if (white > black) return 'white';
  return 'tie';
};