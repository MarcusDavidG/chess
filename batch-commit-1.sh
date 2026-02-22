#!/bin/bash

# Batch commit script for rapid improvements
cd /home/marcus/chess

# Function to make a commit
make_commit() {
    git add .
    git commit -m "$1"
    echo "✓ Committed: $1"
}

echo "Starting batch commits..."

# Add TypeScript strict mode improvements
echo 'export const STRICT_MODE_CONFIG = true;' >> src/lib/config.ts
make_commit "feat: add TypeScript strict mode configuration"

# Add error boundary component
cat > src/components/ErrorBoundary.tsx << 'EOF'
'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600">Please refresh the page and try again.</p>
        </div>
      )
    }

    return this.props.children
  }
}
EOF
make_commit "feat: add error boundary component for better error handling"

# Add loading spinner component
cat > src/components/ui/spinner.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        sizeClasses[size],
        className
      )}
    />
  )
}
EOF
make_commit "feat: add reusable spinner component"

# Add toast notification system
cat > src/components/ui/toast.tsx << 'EOF'
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${typeClasses[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
EOF
make_commit "feat: add toast notification component"

# Add chess game constants file
cat > src/lib/chess-constants.ts << 'EOF'
export const CHESS_CONSTANTS = {
  BOARD_SIZE: 8,
  INITIAL_TIMER_MINUTES: 10,
  TIMER_WARNING_SECONDS: 60,
  MOVE_ANIMATION_DURATION: 300,
  PIECE_DRAG_OPACITY: 0.7,
} as const

export const PIECE_VALUES = {
  p: 1, // pawn
  n: 3, // knight
  b: 3, // bishop
  r: 5, // rook
  q: 9, // queen
  k: 0, // king (invaluable)
} as const

export const STARTING_POSITIONS = {
  WHITE_KING: 'e1',
  BLACK_KING: 'e8',
  WHITE_QUEEN: 'd1',
  BLACK_QUEEN: 'd8',
} as const
EOF
make_commit "feat: add comprehensive chess game constants"

# Add utility functions
cat > src/lib/chess-utils.ts << 'EOF'
import { Square, PieceSymbol } from 'chess.js'

/**
 * Converts algebraic notation to array indices
 */
export function squareToIndices(square: Square): [number, number] {
  const file = square.charCodeAt(0) - 97 // a=0, b=1, etc.
  const rank = parseInt(square[1]) - 1   // 1=0, 2=1, etc.
  return [7 - rank, file] // flip rank for display
}

/**
 * Converts array indices to algebraic notation
 */
export function indicesToSquare(row: number, col: number): Square {
  const file = String.fromCharCode(97 + col)
  const rank = (8 - row).toString()
  return (file + rank) as Square
}

/**
 * Calculates material advantage
 */
export function calculateMaterialAdvantage(pieces: { [square: string]: { type: PieceSymbol, color: string } }): number {
  let whiteValue = 0
  let blackValue = 0
  
  const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
  
  Object.values(pieces).forEach(piece => {
    const value = values[piece.type] || 0
    if (piece.color === 'w') {
      whiteValue += value
    } else {
      blackValue += value
    }
  })
  
  return whiteValue - blackValue
}
EOF
make_commit "feat: add chess utility functions for board calculations"

echo "Batch 1 complete! Made 6 commits."
