/**
 * Accessibility utilities for chess game
 */

export const ARIA_LABELS = {
  CHESS_BOARD: 'Chess board with 64 squares',
  PIECE_MOVE: 'Move chess piece',
  GAME_STATUS: 'Current game status',
  TIMER: 'Game timer',
  MOVE_HISTORY: 'List of chess moves',
} as const

export const KEYBOARD_SHORTCUTS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
} as const

/**
 * Announces game events to screen readers
 */
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
