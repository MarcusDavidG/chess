'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Settings, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react'

interface GameSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export function GameSettings({ isOpen, onClose }: GameSettingsProps) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showCoordinates, setShowCoordinates] = useState(true)
  const [highlightMoves, setHighlightMoves] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-6 m-4">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5" />
          <h2 className="text-xl font-bold">Game Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>Sound Effects</span>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showCoordinates ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>Show Coordinates</span>
            </div>
            <Switch checked={showCoordinates} onCheckedChange={setShowCoordinates} />
          </div>

          <div className="flex items-center justify-between">
            <span>Highlight Moves</span>
            <Switch checked={highlightMoves} onCheckedChange={setHighlightMoves} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Animation Speed</label>
            <div className="flex gap-2">
              {(['slow', 'normal', 'fast'] as const).map((speed) => (
                <Badge
                  key={speed}
                  variant={animationSpeed === speed ? 'default' : 'info'}
                  className="cursor-pointer"
                  onClick={() => setAnimationSpeed(speed)}
                >
                  {speed}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onClose} className="flex-1">
            Save
          </Button>
        </div>
      </Card>
    </div>
  )
}
