import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

/**
 * Reusable Card component that provides consistent styling.
 * Eliminates duplicated card styling patterns across components.
 */
export function Card({ children, className, hoverable = true }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-lg shadow-md p-6',
          hoverable && 'hover:shadow-lg transition-shadow duration-300',
          className
        )
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={twMerge('mb-4', className)}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={twMerge('text-xl font-semibold text-gray-900', className)}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={twMerge('text-gray-600', className)}>
      {children}
    </p>
  )
}
