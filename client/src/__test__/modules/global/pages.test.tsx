import { render, fireEvent } from '@testing-library/react'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import rerender from 'react-test-renderer'
import '@testing-library/jest-dom'

import { ErrorPage } from '@global'

describe('pages', () => {
  it('should render the 404 page correctly', async () => {
    const errorComponent = (
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    )

    const errorPage = rerender.create(errorComponent)
    expect(errorPage).toMatchSnapshot()

    const { getByText } = await render(errorComponent)
    expect(getByText(/404/i)).toBeInTheDocument()
    expect(getByText(/page not found/i)).toBeInTheDocument()
    expect(getByText(/back to home/i)).toBeInTheDocument()
  })

  test('can navigate to home page', async () => {
    window.history.pushState({}, '', '/bad/route')

    const router = createBrowserRouter([
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        errorElement: <ErrorPage />,
        children: [{ path: '/', element: <div>Homepage</div> }],
      },
    ])

    const { getByText } = await render(<RouterProvider router={router} />)

    const button = getByText(/back to home/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(window.location.pathname).toBe('/')
  })
})
