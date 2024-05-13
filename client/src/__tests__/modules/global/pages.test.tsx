import { render, fireEvent } from '@testing-library/react';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import '@testing-library/jest-dom';

import { ErrorPage } from '@global';

describe('pages', () => {
  it('should render the 404 page correctly', async () => {
    const errorComponent = (
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );

    const { container } = await render(errorComponent);
    expect(container).toMatchSnapshot();
  });

  test('can navigate to home page', async () => {
    window.history.pushState({}, '', '/bad/route');

    const router = createBrowserRouter([
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        errorElement: <ErrorPage />,
        children: [{ path: '/', element: <div>Homepage</div> }],
      },
    ]);

    const { getByText } = await render(<RouterProvider router={router} />);

    const button = getByText(/back to home/i);
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/');
  });
});
