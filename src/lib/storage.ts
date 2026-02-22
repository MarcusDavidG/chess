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
