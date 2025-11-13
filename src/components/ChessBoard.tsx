'use client'

import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ChessBoardProps {
  gameId: number
  onMove: (move: string) => void
  isPlayerTurn: boolean
  gameState: any
}

export default function ChessBoard({ gameId, onMove, isPlayerTurn, gameState }: ChessBoardProps) {
  const [chess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<string[]>([])

  useEffect(() => {
    if (gameState?.moves) {
      chess.reset()
      gameState.moves.forEach((move: string) => {
        chess.move(move)
      })
      setBoard(chess.board())
    }
  }, [gameState, chess])

  const handleSquareClick = (square: string) => {
    if (!isPlayerTurn) return

    if (selectedSquare === square) {
      setSelectedSquare(null)
      setPossibleMoves([])
      return
    }

    if (selectedSquare) {
      // Try to make a move
      const move = chess.move({
        from: selectedSquare,
        to: square,
        promotion: 'q' // Always promote to queen for simplicity
      })

      if (move) {
        onMove(move.san)
        setBoard(chess.board())
        setSelectedSquare(null)
        setPossibleMoves([])
      } else {
        // Invalid move, select new square
        setSelectedSquare(square)
        const moves = chess.moves({ square, verbose: true })
        setPossibleMoves(moves.map(m => m.to))
      }
    } else {
      // Select piece
      const piece = chess.get(square)
      if (piece && piece.color === chess.turn()) {
        setSelectedSquare(square)
        const moves = chess.moves({ square, verbose: true })
        setPossibleMoves(moves.map(m => m.to))
      }
    }
  }

  const renderSquare = (square: any, rowIndex: number, colIndex: number) => {
    const squareName = String.fromCharCode(97 + colIndex) + (8 - rowIndex)
    const isLight = (rowIndex + colIndex) % 2 === 0
    const isSelected = selectedSquare === squareName
    const isPossibleMove = possibleMoves.includes(squareName)

    return (
      <div
        key={squareName}
        className={`w-12 h-12 flex items-center justify-center cursor-pointer border ${
          isLight ? 'bg-amber-100' : 'bg-amber-800'
        } ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
          isPossibleMove ? 'ring-2 ring-green-500' : ''
        }`}
        onClick={() => handleSquareClick(squareName)}
      >
        {square && (
          <span className={`text-2xl ${square.color === 'w' ? 'text-white' : 'text-black'}`}>
            {getPieceSymbol(square.type, square.color)}
          </span>
        )}
      </div>
    )
  }

  const getPieceSymbol = (type: string, color: string) => {
    const symbols = {
      k: color === 'w' ? '♔' : '♚',
      q: color === 'w' ? '♕' : '♛',
      r: color === 'w' ? '♖' : '♜',
      b: color === 'w' ? '♗' : '♝',
      n: color === 'w' ? '♘' : '♞',
      p: color === 'w' ? '♙' : '♟'
    }
    return symbols[type as keyof typeof symbols] || ''
  }

  return (
    <Card className="p-4">
      <div className="grid grid-cols-8 gap-0 border-2 border-gray-800">
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => renderSquare(square, rowIndex, colIndex))
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {isPlayerTurn ? "Your turn" : "Opponent's turn"}
        </p>
        {chess.isCheckmate() && <p className="text-red-600 font-bold">Checkmate!</p>}
        {chess.isStalemate() && <p className="text-yellow-600 font-bold">Stalemate!</p>}
        {chess.inCheck() && <p className="text-orange-600 font-bold">Check!</p>}
      </div>
    </Card>
  )
}
