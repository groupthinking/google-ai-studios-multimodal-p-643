import Image from 'next/image'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  name?: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}

const sizePx = {
  sm: 32,
  md: 40,
  lg: 48,
}

/**
 * Reusable Avatar component for displaying user avatars.
 * Eliminates duplicated avatar/initial badge patterns across components.
 */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name ? name.charAt(0).toUpperCase() : '?'

  if (src) {
    return (
      <Image
        src={src}
        alt={name || 'Avatar'}
        width={sizePx[size]}
        height={sizePx[size]}
        className={twMerge(
          clsx(
            'rounded-full object-cover',
            sizeClasses[size],
            className
          )
        )}
      />
    )
  }

  return (
    <div
      className={twMerge(
        clsx(
          'rounded-full flex items-center justify-center bg-primary-100',
          sizeClasses[size],
          className
        )
      )}
    >
      <span className="text-primary-600 font-semibold">{initials}</span>
    </div>
  )
}
