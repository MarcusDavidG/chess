'use client'

import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Switch({ checked, onCheckedChange, disabled = false, size = 'md', className }: SwitchProps) {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-10 h-5',
    lg: 'w-12 h-6'
  }

  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        sizeClasses[size],
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow-lg transform transition-transform',
          thumbSizeClasses[size],
          checked ? 'translate-x-full' : 'translate-x-0'
        )}
      />
    </button>
  )
}
