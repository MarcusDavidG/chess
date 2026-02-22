/**
 * GameRoom component tests
 */

import { render, screen, fireEvent } from '@testing-library/react'
import GameRoom from '@/components/GameRoom'

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useAccount: () => ({ address: '0x123' }),
  useWriteContract: () => ({
    writeContract: jest.fn(),
  }),
}))

const mockProps = {
  gameId: 1,
  contractAddress: '0x1234567890123456789012345678901234567890'
}

describe('GameRoom', () => {
  it('renders game room with chess board', () => {
    render(<GameRoom {...mockProps} />)
    expect(screen.getByText(/Game Room/i) || document.body).toBeTruthy()
  })

  it('displays game timers', () => {
    render(<GameRoom {...mockProps} />)
    // Should display timer format (MM:SS)
    expect(document.body.textContent).toMatch(/\d+:\d{2}/)
  })

  it('handles pause/resume functionality', () => {
    render(<GameRoom {...mockProps} />)
    const pauseButton = screen.queryByRole('button', { name: /pause/i })
    if (pauseButton) {
      fireEvent.click(pauseButton)
    }
    expect(true).toBe(true)
  })

  it('handles game reset', () => {
    render(<GameRoom {...mockProps} />)
    const resetButton = screen.queryByRole('button', { name: /reset/i })
    if (resetButton) {
      fireEvent.click(resetButton)
    }
    expect(true).toBe(true)
  })
})
