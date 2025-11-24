'use client'

import { useState, useEffect } from 'react'
import { subscribeToLeaderboard } from '@/lib/sdsClient'
import { Medal, TrendingUp, Star } from 'lucide-react'

interface LeaderboardEntry {
  player: string
  rating: bigint
  gamesPlayed: bigint
  gamesWon: bigint
}

interface LeaderboardDisplayProps {
  contractAddress: string
}

const getRankBadge = (index: number) => {
  const badges = [
    { icon: Medal, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', label: '1st' },
    { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', label: '2nd' },
    { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-600/10', border: 'border-amber-600/30', label: '3rd' },
  ]
  
  if (index < 3) {
    const Badge = badges[index]
    return (
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${Badge.bg} border ${Badge.border}`}>
        <Badge.icon className={`w-4 h-4 ${Badge.color}`} />
        <span className={`text-xs font-bold ${Badge.color}`}>{Badge.label}</span>
      </div>
    )
  }
  
  return (
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
    </div>
  )
}

const getWinRate = (won: bigint, played: bigint) => {
  if (played === BigInt(0)) return 0
  return Number((won * BigInt(100)) / played)
}

export default function LeaderboardDisplay({ contractAddress }: LeaderboardDisplayProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard(contractAddress, (data) => {
      setLeaderboard(data)
    })

    return unsubscribe
  }, [contractAddress])

  return (
    <div className="space-y-3">
      {leaderboard.length > 0 ? (
        leaderboard.map((entry, index) => {
          const winRate = getWinRate(entry.gamesWon, entry.gamesPlayed)
          return (
            <div 
              key={entry.player} 
              className={`group relative p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                index < 3 
                  ? 'border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/20' 
                  : 'border-border/50 hover:border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                {getRankBadge(index)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-mono font-semibold truncate">
                      {entry.player.slice(0, 8)}...{entry.player.slice(-6)}
                    </p>
                    {winRate >= 70 && (
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-medium">{entry.rating.toString()}</span>
                    </div>
                    <div className="h-3 w-px bg-border"></div>
                    <span>
                      <span className="text-emerald-500 font-semibold">{entry.gamesWon.toString()}W</span>
                      {' / '}
                      <span className="font-medium">{entry.gamesPlayed.toString()}P</span>
                    </span>
                    {entry.gamesPlayed > BigInt(0) && (
                      <>
                        <div className="h-3 w-px bg-border"></div>
                        <span className={`font-semibold ${
                          winRate >= 70 ? 'text-emerald-500' : 
                          winRate >= 50 ? 'text-amber-500' : 
                          'text-red-500'
                        }`}>
                          {winRate}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Win rate progress bar */}
              {entry.gamesPlayed > BigInt(0) && (
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      winRate >= 70 ? 'bg-emerald-500' : 
                      winRate >= 50 ? 'bg-amber-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${winRate}%` }}
                  ></div>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3 animate-pulse" />
          <p className="text-muted-foreground">Loading leaderboard...</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Fetching player rankings</p>
        </div>
      )}
    </div>
  )
}
