export const CHESS_CONSTANTS = {
  BOARD_SIZE: 8,
  INITIAL_TIMER_MINUTES: 10,
  TIMER_WARNING_SECONDS: 60,
  MOVE_ANIMATION_DURATION: 300,
  PIECE_DRAG_OPACITY: 0.7,
} as const

export const PIECE_VALUES = {
  p: 1, // pawn
  n: 3, // knight
  b: 3, // bishop
  r: 5, // rook
  q: 9, // queen
  k: 0, // king (invaluable)
} as const

export const STARTING_POSITIONS = {
  WHITE_KING: 'e1',
  BLACK_KING: 'e8',
  WHITE_QUEEN: 'd1',
  BLACK_QUEEN: 'd8',
} as const
