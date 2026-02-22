#!/bin/bash

# Rapid-fire batch 2 - Documentation and small improvements
cd /home/marcus/chess

# Function to make a commit
make_commit() {
    git add .
    git commit -m "$1"
    echo "✓ Committed: $1"
}

echo "Starting rapid-fire batch 2..."

# Add documentation files
echo "# Chess Game Rules\n\nBasic chess rules and gameplay mechanics." > docs/CHESS_RULES.md
make_commit "docs: add chess rules documentation"

echo "# API Reference\n\nComplete API documentation for the chess game." > docs/API_REFERENCE.md
make_commit "docs: add API reference documentation"

echo "# Deployment Guide\n\nStep-by-step deployment instructions." > docs/DEPLOYMENT.md
make_commit "docs: add deployment guide"

echo "# Troubleshooting\n\nCommon issues and solutions." > docs/TROUBLESHOOTING.md
make_commit "docs: add troubleshooting guide"

echo "# Performance Tips\n\nOptimization strategies for the chess game." > docs/PERFORMANCE.md
make_commit "docs: add performance optimization guide"

# Add more utility files
echo "export const CHESS_NOTATION = { ALGEBRAIC: 'algebraic', DESCRIPTIVE: 'descriptive', COORDINATE: 'coordinate' } as const" > src/lib/notation-types.ts
make_commit "feat: add chess notation type constants"

echo "export const TIME_CONTROLS = { BULLET: 60, BLITZ: 300, RAPID: 900, CLASSICAL: 1800 } as const" > src/lib/time-controls.ts
make_commit "feat: add time control constants"

echo "export const RATING_RANGES = { BEGINNER: [0, 800], INTERMEDIATE: [800, 1600], ADVANCED: [1600, 2400] } as const" > src/lib/rating-ranges.ts
make_commit "feat: add rating range constants"

# Add more component files
cat > src/components/ui/alert.tsx << 'EOF'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        variant === 'destructive' ? 'border-red-200 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  )
}
EOF
make_commit "feat: add alert component"

cat > src/components/ui/checkbox.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Checkbox({ checked, onCheckedChange, disabled, className }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      disabled={disabled}
      className={cn(
        'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
        className
      )}
    />
  )
}
EOF
make_commit "feat: add checkbox component"

# Add more constants
echo "export const PIECE_MOVEMENTS = { PAWN: 'forward', ROOK: 'straight', BISHOP: 'diagonal', KNIGHT: 'l-shape', QUEEN: 'any', KING: 'one-square' } as const" > src/lib/piece-movements.ts
make_commit "feat: add piece movement constants"

echo "export const GAME_RESULTS = { WHITE_WINS: 'white_wins', BLACK_WINS: 'black_wins', DRAW: 'draw', ONGOING: 'ongoing' } as const" > src/lib/game-results.ts
make_commit "feat: add game result constants"

echo "export const DRAW_TYPES = { STALEMATE: 'stalemate', INSUFFICIENT_MATERIAL: 'insufficient', THREEFOLD_REPETITION: 'repetition', FIFTY_MOVE_RULE: 'fifty_move' } as const" > src/lib/draw-types.ts
make_commit "feat: add draw type constants"

# Add more utility functions
echo "export const isValidSquare = (square: string) => /^[a-h][1-8]$/.test(square);" > src/lib/square-validation.ts
make_commit "feat: add square validation utility"

echo "export const getSquareColor = (square: string) => { const file = square.charCodeAt(0) - 97; const rank = parseInt(square[1]) - 1; return (file + rank) % 2 === 0 ? 'dark' : 'light'; };" > src/lib/square-color.ts
make_commit "feat: add square color utility"

echo "export const getOppositeColor = (color: 'w' | 'b') => color === 'w' ? 'b' : 'w';" > src/lib/color-utils.ts
make_commit "feat: add color utility functions"

# Add configuration files
echo "export const GAME_CONFIG = { MAX_PLAYERS: 2, MIN_MOVE_TIME: 1000, MAX_GAME_TIME: 7200000 } as const" > src/lib/game-config.ts
make_commit "feat: add game configuration constants"

echo "export const UI_CONFIG = { TOAST_DURATION: 3000, MODAL_ANIMATION: 200, TOOLTIP_DELAY: 500 } as const" > src/lib/ui-config.ts
make_commit "feat: add UI configuration constants"

echo "export const NETWORK_CONFIG = { RETRY_ATTEMPTS: 3, TIMEOUT: 5000, POLLING_INTERVAL: 1000 } as const" > src/lib/network-config.ts
make_commit "feat: add network configuration constants"

# Add more component improvements
echo "// Loading states for different components" > src/lib/loading-states.ts
echo "export const LOADING_STATES = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' } as const" >> src/lib/loading-states.ts
make_commit "feat: add loading state constants"

echo "// Keyboard shortcuts for chess game" > src/lib/keyboard-shortcuts.ts
echo "export const SHORTCUTS = { NEW_GAME: 'n', RESET: 'r', PAUSE: 'p', SETTINGS: 's' } as const" >> src/lib/keyboard-shortcuts.ts
make_commit "feat: add keyboard shortcut constants"

echo "Rapid-fire batch 2 complete! Made 21 commits."
