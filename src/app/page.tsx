'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import GameRoom from '@/components/GameRoom'
import LeaderboardDisplay from '@/components/LeaderboardDisplay'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Crown, Zap, Shield, Trophy, Sparkles } from 'lucide-react'

// Application constants
const CONTRACT_ADDRESS = '0x5f481427Dc681635dDEE38255da2E98FcaC90CeE';
const APP_TITLE = 'Quantum Chess Arena';
const APP_DESCRIPTION = 'Real-time blockchain chess battles powered by Somnia Data Streams';

/**
 * Main application page component
 * Displays the landing page with game controls and leaderboard
 */
export default function Home() {
  const { isConnected } = useAccount()
  const [gameId, setGameId] = useState<number | null>(null)
  const [opponentAddress, setOpponentAddress] = useState('')

  if (gameId) {
    return <GameRoom gameId={gameId} contractAddress={CONTRACT_ADDRESS} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-950/10 dark:to-amber-500/5 text-foreground">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Theme Toggle - Top Right */}
          <div className="absolute top-6 right-6 z-10">
            <ThemeToggle />
          </div>
          
          <header className="text-center mb-12 relative">
            <div className="inline-block mb-4 animate-pulse">
              <Crown className="w-16 h-16 text-amber-500 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4 tracking-tight">
              {APP_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              {APP_DESCRIPTION}
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Zap className="w-4 h-4" />
                <span>Instant Sync</span>
              </div>
              <div className="flex items-center gap-1 text-purple-500">
                <Shield className="w-4 h-4" />
                <span>Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500">
                <Trophy className="w-4 h-4" />
                <span>ELO Rankings</span>
              </div>
            </div>
          </header>

          <div className="flex justify-center mb-12">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <ConnectButton />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Start Game Card */}
            <Card className="p-8 bg-gradient-to-br from-card via-card to-amber-500/5 border-2 border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Start New Game
                </h2>
              </div>
              {isConnected ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground/90">
                      Opponent Address (optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="0x..."
                      value={opponentAddress}
                      onChange={(e) => setOpponentAddress(e.target.value)}
                      className="bg-background/50 border-2 border-amber-500/20 focus:border-amber-500 transition-colors h-12 text-base"
                    />
                  </div>
                  <Button 
                    onClick={() => setGameId(Date.now())} 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Play against AI or challenge friends
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Connect your wallet to start playing</p>
                </div>
              )}
            </Card>

            {/* Leaderboard Card */}
            <Card className="p-8 bg-gradient-to-br from-card via-card to-purple-500/5 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-purple-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Leaderboard
                </h2>
              </div>
              <LeaderboardDisplay contractAddress={CONTRACT_ADDRESS} />
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <Card className="p-8 md:p-10 bg-gradient-to-br from-card via-card to-emerald-500/5 border-2 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Powered by Somnia Data Streams
                </h3>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  Experience the future of on-chain gaming with real-time synchronization,
                  instant move validation, and live spectating capabilities.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-amber-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Real-Time Moves</h4>
                  <p className="text-sm text-muted-foreground">Instant move synchronization via SDS streams</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-purple-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">Live Spectating</h4>
                  <p className="text-sm text-muted-foreground">Watch games unfold in real-time</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">On-Chain Validation</h4>
                  <p className="text-sm text-muted-foreground">All moves validated on Somnia Testnet</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
