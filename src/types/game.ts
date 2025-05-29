export type Player = 'black' | 'white';
export type CellState = Player | null;
export type Board = CellState[][];
export type GameStatus = 'playing' | 'gameOver';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  blackScore: number;
  whiteScore: number;
  validMoves: number[][];
}

export interface Position {
  row: number;
  col: number;
}