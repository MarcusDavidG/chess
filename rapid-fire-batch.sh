#!/bin/bash

# Rapid-fire batch commit script - Small improvements
cd /home/marcus/chess

# Function to make a commit
make_commit() {
    git add .
    git commit -m "$1"
    echo "✓ Committed: $1"
}

echo "Starting rapid-fire commits..."

# Add individual constants files
echo "export const ANIMATION_DURATIONS = { FAST: 150, NORMAL: 300, SLOW: 500 } as const" > src/lib/animation-constants.ts
make_commit "feat: add animation duration constants"

echo "export const COLORS = { PRIMARY: '#f59e0b', SECONDARY: '#3b82f6', SUCCESS: '#10b981', ERROR: '#ef4444' } as const" > src/lib/color-constants.ts
make_commit "feat: add color palette constants"

echo "export const BREAKPOINTS = { SM: 640, MD: 768, LG: 1024, XL: 1280 } as const" > src/lib/breakpoint-constants.ts
make_commit "feat: add responsive breakpoint constants"

echo "export const Z_INDEX = { MODAL: 50, TOOLTIP: 40, DROPDOWN: 30, HEADER: 20 } as const" > src/lib/z-index-constants.ts
make_commit "feat: add z-index layer constants"

# Add utility functions
echo "export const debounce = (fn: Function, delay: number) => { let timeoutId: NodeJS.Timeout; return (...args: any[]) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => fn(...args), delay); }; };" > src/lib/debounce.ts
make_commit "feat: add debounce utility function"

echo "export const throttle = (fn: Function, limit: number) => { let inThrottle: boolean; return (...args: any[]) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; };" > src/lib/throttle.ts
make_commit "feat: add throttle utility function"

echo "export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);" > src/lib/math-utils.ts
make_commit "feat: add math utility functions"

echo "export const formatBytes = (bytes: number) => { const sizes = ['B', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(1024)); return \`\${(bytes / Math.pow(1024, i)).toFixed(1)} \${sizes[i]}\`; };" > src/lib/format-utils.ts
make_commit "feat: add format utility functions"

# Add more component improvements
echo "// Chess piece movement animations" > src/lib/piece-animations.ts
echo "export const PIECE_ANIMATIONS = { MOVE: 'transform transition-transform duration-300', CAPTURE: 'animate-pulse', HOVER: 'hover:scale-110' } as const" >> src/lib/piece-animations.ts
make_commit "feat: add chess piece animation constants"

echo "// Board theme configurations" > src/lib/board-themes.ts
echo "export const BOARD_THEMES = { CLASSIC: { light: 'bg-amber-50', dark: 'bg-amber-900' }, MODERN: { light: 'bg-slate-100', dark: 'bg-slate-800' } } as const" >> src/lib/board-themes.ts
make_commit "feat: add chess board theme configurations"

# Add error handling utilities
echo "export class ChessError extends Error { constructor(message: string, public code: string) { super(message); this.name = 'ChessError'; } }" > src/lib/chess-errors.ts
make_commit "feat: add custom chess error classes"

echo "export const ERROR_MESSAGES = { INVALID_MOVE: 'Invalid chess move', GAME_OVER: 'Game is already over', NOT_YOUR_TURN: 'Not your turn' } as const" > src/lib/error-messages.ts
make_commit "feat: add error message constants"

# Add more UI components
cat > src/components/ui/separator.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
    />
  )
}
EOF
make_commit "feat: add separator component"

cat > src/components/ui/skeleton.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  )
}
EOF
make_commit "feat: add skeleton loading component"

# Add more constants
echo "export const GAME_MODES = { CLASSIC: 'classic', BLITZ: 'blitz', BULLET: 'bullet' } as const" > src/lib/game-modes.ts
make_commit "feat: add game mode constants"

echo "export const PIECE_THEMES = { CLASSIC: 'classic', MODERN: 'modern', MINIMAL: 'minimal' } as const" > src/lib/piece-themes.ts
make_commit "feat: add chess piece theme constants"

echo "export const SOUND_EFFECTS = { MOVE: '/sounds/move.mp3', CAPTURE: '/sounds/capture.mp3', CHECK: '/sounds/check.mp3' } as const" > src/lib/sound-paths.ts
make_commit "feat: add sound effect path constants"

echo "export const API_ENDPOINTS = { LEADERBOARD: '/api/leaderboard', GAMES: '/api/games', STATS: '/api/stats' } as const" > src/lib/api-endpoints.ts
make_commit "feat: add API endpoint constants"

# Add more utility functions
echo "export const generateId = () => Math.random().toString(36).substr(2, 9);" > src/lib/id-generator.ts
make_commit "feat: add ID generator utility"

echo "export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));" > src/lib/async-utils.ts
make_commit "feat: add async utility functions"

echo "Rapid-fire batch complete! Made 20 commits."
