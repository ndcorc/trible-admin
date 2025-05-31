/* import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'
import { describe, it } from 'node:test'

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Processing..." />)
    expect(screen.getByText('Processing...')).toBeInTheDocument()
    expect(screen.getByLabelText('Processing...')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    expect(document.querySelector('svg')).toHaveClass('h-4', 'w-4')

    rerender(<LoadingSpinner size="lg" />)
    expect(document.querySelector('svg')).toHaveClass('h-12', 'w-12')
  })

  it('applies variant classes correctly', () => {
    render(<LoadingSpinner variant="white" />)
    expect(document.querySelector('svg')).toHaveClass('text-white')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    expect(screen.getByRole('status')).toHaveClass('custom-class')
  })

  it('renders text with correct size', () => {
    render(<LoadingSpinner size="lg" text="Loading data..." />)
    expect(screen.getByText('Loading data...')).toHaveClass('text-lg')
  })

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner text="Custom loading" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Custom loading')
  })
})
 */
