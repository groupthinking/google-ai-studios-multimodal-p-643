interface ProgressBarProps {
  value: number
  className?: string
  barClassName?: string
}

/**
 * Reusable ProgressBar component.
 * Eliminates duplicated progress bar patterns across components.
 */
export function ProgressBar({ value, className, barClassName }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className || ''}`}>
      <div
        className={`bg-primary-600 h-2 rounded-full transition-all duration-300 ${barClassName || ''}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
