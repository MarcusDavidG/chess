'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, Target, Zap } from 'lucide-react'

interface GameStatsProps {
  totalMoves: number
  averageMoveTime: number
  capturedPieces: string[]
  gameTime: number
}

export function GameStats({ totalMoves, averageMoveTime, capturedPieces, gameTime }: GameStatsProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  const formatMoveTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4" />
        <h3 className="font-semibold">Game Statistics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-muted-foreground">Moves</span>
          </div>
          <div className="text-lg font-bold">{totalMoves}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-green-500" />
            <span className="text-xs text-muted-foreground">Game Time</span>
          </div>
          <div className="text-lg font-bold">{formatTime(gameTime)}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Avg Move</span>
          </div>
          <div className="text-lg font-bold">{formatMoveTime(averageMoveTime)}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground">Captures</span>
          </div>
          <div className="text-lg font-bold">{capturedPieces.length}</div>
        </div>
      </div>

      {capturedPieces.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-muted-foreground mb-2">Captured Pieces</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.map((piece, index) => (
              <Badge key={index} variant="info" size="sm">
                {piece}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
