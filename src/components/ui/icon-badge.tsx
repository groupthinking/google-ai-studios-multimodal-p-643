import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface IconBadgeProps {
  icon: React.ElementType
  className?: string
  iconClassName?: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const variantClasses = {
  primary: 'bg-primary-50',
  secondary: 'bg-gray-50',
  success: 'bg-green-50',
  warning: 'bg-yellow-50',
  error: 'bg-red-50',
}

const iconVariantClasses = {
  primary: 'text-primary-600',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
}

/**
 * Reusable IconBadge component for displaying icons in circular badges.
 * Eliminates duplicated icon circle patterns across components.
 */
export function IconBadge({ icon: Icon, className, iconClassName, variant = 'primary' }: IconBadgeProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex items-center justify-center w-12 h-12 rounded-full',
          variantClasses[variant],
          className
        )
      )}
    >
      <Icon className={twMerge(clsx('w-6 h-6', iconVariantClasses[variant], iconClassName))} />
    </div>
  )
}
