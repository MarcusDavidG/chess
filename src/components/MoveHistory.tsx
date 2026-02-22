'use client'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { History, RotateCcw } from 'lucide-react'

interface MoveHistoryProps {
  moves: string[]
  onMoveClick?: (moveIndex: number) => void
}

export function MoveHistory({ moves, onMoveClick }: MoveHistoryProps) {
  const movePairs = []
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1]
    })
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-4 h-4" />
        <h3 className="font-semibold">Move History</h3>
      </div>

      <ScrollArea className="h-64">
        <div className="space-y-1">
          {movePairs.map((pair) => (
            <div key={pair.number} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-muted-foreground">{pair.number}.</span>
              <button
                className="px-2 py-1 rounded hover:bg-muted transition-colors"
                onClick={() => onMoveClick?.((pair.number - 1) * 2)}
              >
                {pair.white}
              </button>
              {pair.black && (
                <button
                  className="px-2 py-1 rounded hover:bg-muted transition-colors"
                  onClick={() => onMoveClick?.((pair.number - 1) * 2 + 1)}
                >
                  {pair.black}
                </button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {moves.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <RotateCcw className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No moves yet</p>
        </div>
      )}
    </Card>
  )
}
