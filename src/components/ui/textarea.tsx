import { cn } from '@/lib/utils'

interface TextareaProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  rows?: number
}

export function Textarea({ placeholder, value, onChange, className, rows = 3 }: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        className
      )}
    />
  )
}
