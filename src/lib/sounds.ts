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
