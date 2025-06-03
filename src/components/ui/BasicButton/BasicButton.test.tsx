/* import { render, screen, fireEvent } from '@testing-library/react'
import { BasicButton } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<BasicButton>Click me</BasicButton>)
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<BasicButton onClick={handleClick}>Click me</BasicButton>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<BasicButton loading>Loading</BasicButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes correctly', () => {
    render(<BasicButton variant="danger">Delete</BasicButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-600')
  })
})
 */
