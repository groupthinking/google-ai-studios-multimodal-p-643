interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

/**
 * Reusable LoadingSpinner component for displaying loading states.
 * Eliminates duplicated loading spinner patterns across components.
 */
export function LoadingSpinner({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}
      />
      {message && <span className="ml-3 text-gray-600">{message}</span>}
    </div>
  )
}

interface ErrorMessageProps {
  message: string
}

/**
 * Reusable ErrorMessage component for displaying error states.
 * Eliminates duplicated error message patterns across components.
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
      Error: {message}
    </div>
  )
}

interface SuccessMessageProps {
  message: string
}

/**
 * Reusable SuccessMessage component for displaying success states.
 */
export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 text-green-600 p-4 rounded-lg">
      {message}
    </div>
  )
}
