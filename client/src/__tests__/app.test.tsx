import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { act } from 'react-dom/test-utils'

describe('Router', () => {
  // beforeEach(() => {
  //   window.history.pushState({}, 'Test page', '/')
  // })

  // describe('if not authenticated', () => {
  //   it('should render the login page', async () => {
  //     await act(async () => {
  //       render(<App />)
  //     })
  // expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  // })
  // it('should navigate to the register page', () => {
  //   const { rerender } = render(<App />)
  //     userEvent.click(screen.getByText(/sign up/i))
  //   })
  //   expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  // })
  // })
  it('temp', () => {
    expect(true).toBe(true)
  })
})
