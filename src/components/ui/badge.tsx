import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type BadgeVariant = 'active' | 'completed' | 'pending' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  pending: 'bg-yellow-100 text-yellow-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
}

/**
 * Reusable Badge component for displaying status indicators.
 * Eliminates duplicated status badge patterns across components.
 */
export function Badge({ variant = 'info', children, className }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          variantClasses[variant],
          className
        )
      )}
    >
      {children}
    </span>
  )
}
