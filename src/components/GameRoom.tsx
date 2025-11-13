'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { ChessBoard } from './ChessBoard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { subscribeToGameEvents } from '@/lib/sdsClient'

interface GameRoomProps {
  gameId: number
  contractAddress: string
}

export default function GameRoom({ gameId, contractAddress }: GameRoomProps) {
  const { address } = useAccount()
  const [gameState, setGameState] = useState<any>(null)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)

  const { data: gameData } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        inputs: [{ name: '', type: 'uint256' }],
        name: 'games',
        outputs: [
          { name: 'player1', type: 'address' },
          { name: 'player2', type: 'address' },
          { name: 'moves', type: 'string[]' },
          { name: 'startTime', type: 'uint256' },
          { name: 'status', type: 'uint8' },
          { name: 'winner', type: 'address' }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ],
    functionName: 'games',
    args: [BigInt(gameId)]
  })

  const { writeContract } = useWriteContract()

  useEffect(() => {
    if (gameData) {
      const [player1, player2, moves, startTime, status, winner] = gameData
      setGameState({ player1, player2, moves, startTime, status, winner })
      setIsPlayerTurn(
        (address === player1 && moves.length % 2 === 0) ||
        (address === player2 && moves.length % 2 === 1)
      )
    }
  }, [gameData, address])

  useEffect(() => {
    // Subscribe to SDS events for real-time updates
    const subscription = subscribeToGameEvents(contractAddress, gameId, (data) => {
      console.log('Real-time game update:', data)
      // Update game state from SDS data
      setGameState(data)
    })

    return () => {
      // Cleanup subscription
    }
  }, [contractAddress, gameId])

  const handleMove = (move: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: [
        {
          inputs: [
            { name: 'gameId', type: 'uint256' },
            { name: 'move', type: 'string' }
          ],
          name: 'makeMove',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'makeMove',
      args: [BigInt(gameId), move]
    })
  }

  const handleEndGame = (winner: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: [
        {
          inputs: [
            { name: 'gameId', type: 'uint256' },
            { name: 'winner', type: 'address' }
          ],
          name: 'endGame',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'endGame',
      args: [BigInt(gameId), winner as `0x${string}`]
    })
  }

  if (!gameState) return <div>Loading game...</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Game #{gameId}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ChessBoard
              gameId={gameId}
              onMove={handleMove}
              isPlayerTurn={isPlayerTurn}
              gameState={gameState}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Game Info</h3>
              <p>Player 1: {gameState.player1}</p>
              <p>Player 2: {gameState.player2 || 'Waiting...'}</p>
              <p>Status: {gameState.status === 0 ? 'Waiting' : gameState.status === 1 ? 'Active' : 'Finished'}</p>
              {gameState.winner && <p>Winner: {gameState.winner}</p>}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Move History</h3>
              <div className="max-h-40 overflow-y-auto">
                {gameState.moves.map((move: string, index: number) => (
                  <div key={index} className="text-sm">
                    {Math.floor(index / 2) + 1}.{index % 2 === 0 ? '' : '..'} {move}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-x-2">
              <Button onClick={() => handleEndGame(address!)} variant="destructive">
                End Game (Win)
              </Button>
              <Button onClick={() => handleEndGame('0x0000000000000000000000000000000000000000')} variant="outline">
                End Game (Draw)
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
