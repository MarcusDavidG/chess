#!/bin/bash

# Batch commit script 2 - More improvements
cd /home/marcus/chess

# Function to make a commit
make_commit() {
    git add .
    git commit -m "$1"
    echo "✓ Committed: $1"
}

echo "Starting batch 2 commits..."

# Add accessibility helpers
cat > src/lib/accessibility.ts << 'EOF'
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
EOF
make_commit "feat: add accessibility utilities and ARIA labels"

# Add performance monitoring
cat > src/lib/performance.ts << 'EOF'
/**
 * Performance monitoring utilities
 */

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(label: string): void {
    this.metrics.set(label, performance.now())
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label)
    if (!startTime) return 0
    
    const duration = performance.now() - startTime
    console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`)
    this.metrics.delete(label)
    return duration
  }

  measureRender<T>(component: string, fn: () => T): T {
    this.startTimer(`render-${component}`)
    const result = fn()
    this.endTimer(`render-${component}`)
    return result
  }
}

export const perf = PerformanceMonitor.getInstance()
EOF
make_commit "feat: add performance monitoring utilities"

# Add game analytics
cat > src/lib/analytics.ts << 'EOF'
/**
 * Game analytics and statistics
 */

export interface GameStats {
  totalMoves: number
  averageMoveTime: number
  capturedPieces: string[]
  gameStartTime: number
  gameEndTime?: number
}

export class GameAnalytics {
  private stats: GameStats = {
    totalMoves: 0,
    averageMoveTime: 0,
    capturedPieces: [],
    gameStartTime: Date.now()
  }

  recordMove(moveTime: number): void {
    this.stats.totalMoves++
    this.stats.averageMoveTime = 
      (this.stats.averageMoveTime * (this.stats.totalMoves - 1) + moveTime) / this.stats.totalMoves
  }

  recordCapture(piece: string): void {
    this.stats.capturedPieces.push(piece)
  }

  endGame(): GameStats {
    this.stats.gameEndTime = Date.now()
    return { ...this.stats }
  }

  getGameDuration(): number {
    const endTime = this.stats.gameEndTime || Date.now()
    return endTime - this.stats.gameStartTime
  }

  reset(): void {
    this.stats = {
      totalMoves: 0,
      averageMoveTime: 0,
      capturedPieces: [],
      gameStartTime: Date.now()
    }
  }
}
EOF
make_commit "feat: add game analytics and statistics tracking"

# Add sound effects system
cat > src/lib/sounds.ts << 'EOF'
/**
 * Sound effects system for chess game
 */

export enum SoundType {
  MOVE = 'move',
  CAPTURE = 'capture',
  CHECK = 'check',
  CHECKMATE = 'checkmate',
  CASTLE = 'castle',
  PROMOTION = 'promotion',
  GAME_START = 'game_start',
  GAME_END = 'game_end',
  TIMER_WARNING = 'timer_warning'
}

export class SoundManager {
  private static instance: SoundManager
  private sounds: Map<SoundType, HTMLAudioElement> = new Map()
  private enabled: boolean = true

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  private constructor() {
    this.initializeSounds()
  }

  private initializeSounds(): void {
    // Initialize with placeholder audio objects
    Object.values(SoundType).forEach(soundType => {
      const audio = new Audio()
      audio.volume = 0.5
      this.sounds.set(soundType, audio)
    })
  }

  play(soundType: SoundType): void {
    if (!this.enabled) return
    
    const sound = this.sounds.get(soundType)
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(console.warn)
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  setVolume(volume: number): void {
    this.sounds.forEach(sound => {
      sound.volume = Math.max(0, Math.min(1, volume))
    })
  }
}

export const soundManager = SoundManager.getInstance()
EOF
make_commit "feat: add sound effects system for game events"

# Add local storage utilities
cat > src/lib/storage.ts << 'EOF'
/**
 * Local storage utilities for game preferences
 */

export interface GamePreferences {
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  soundVolume: number
  showCoordinates: boolean
  highlightMoves: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
  autoPromoteToQueen: boolean
}

const DEFAULT_PREFERENCES: GamePreferences = {
  theme: 'system',
  soundEnabled: true,
  soundVolume: 0.5,
  showCoordinates: true,
  highlightMoves: true,
  animationSpeed: 'normal',
  autoPromoteToQueen: false
}

const STORAGE_KEY = 'quantum-chess-preferences'

export class PreferencesManager {
  private static instance: PreferencesManager
  private preferences: GamePreferences

  static getInstance(): PreferencesManager {
    if (!PreferencesManager.instance) {
      PreferencesManager.instance = new PreferencesManager()
    }
    return PreferencesManager.instance
  }

  private constructor() {
    this.preferences = this.loadPreferences()
  }

  private loadPreferences(): GamePreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) }
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error)
    }
    return DEFAULT_PREFERENCES
  }

  getPreferences(): GamePreferences {
    return { ...this.preferences }
  }

  updatePreference<K extends keyof GamePreferences>(
    key: K,
    value: GamePreferences[K]
  ): void {
    this.preferences[key] = value
    this.savePreferences()
  }

  private savePreferences(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferences))
    } catch (error) {
      console.warn('Failed to save preferences:', error)
    }
  }

  reset(): void {
    this.preferences = { ...DEFAULT_PREFERENCES }
    this.savePreferences()
  }
}

export const preferencesManager = PreferencesManager.getInstance()
EOF
make_commit "feat: add local storage utilities for game preferences"

# Add validation utilities
cat > src/lib/validation.ts << 'EOF'
/**
 * Input validation utilities
 */

export const ValidationRules = {
  ETHEREUM_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  CHESS_MOVE: /^[a-h][1-8][a-h][1-8][qrbn]?$/,
  GAME_ID: /^\d+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
} as const

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export class Validator {
  static ethereumAddress(address: string): ValidationResult {
    if (!address) {
      return { isValid: false, error: 'Address is required' }
    }
    
    if (!ValidationRules.ETHEREUM_ADDRESS.test(address)) {
      return { isValid: false, error: 'Invalid Ethereum address format' }
    }
    
    return { isValid: true }
  }

  static chessMove(move: string): ValidationResult {
    if (!move) {
      return { isValid: false, error: 'Move is required' }
    }
    
    if (!ValidationRules.CHESS_MOVE.test(move)) {
      return { isValid: false, error: 'Invalid chess move format' }
    }
    
    return { isValid: true }
  }

  static gameId(id: string): ValidationResult {
    if (!id) {
      return { isValid: false, error: 'Game ID is required' }
    }
    
    if (!ValidationRules.GAME_ID.test(id)) {
      return { isValid: false, error: 'Game ID must be numeric' }
    }
    
    return { isValid: true }
  }

  static username(username: string): ValidationResult {
    if (!username) {
      return { isValid: false, error: 'Username is required' }
    }
    
    if (!ValidationRules.USERNAME.test(username)) {
      return { isValid: false, error: 'Username must be 3-20 characters, alphanumeric and underscores only' }
    }
    
    return { isValid: true }
  }
}
EOF
make_commit "feat: add input validation utilities"

echo "Batch 2 complete! Made 6 more commits."
