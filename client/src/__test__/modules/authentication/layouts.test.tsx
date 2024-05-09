import { AuthenticationLayout, AuthenticationProvider } from '@authentication';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

describe('AuthenticationLayout', () => {
  it('should render correctly when not authenticated', () => {
    window.history.pushState({}, 'Test page', '/login');

    const router = createBrowserRouter([
      {
        element: (
          <AuthenticationProvider initSession={'test'}>
            <AuthenticationLayout title="login" />
          </AuthenticationProvider>
        ),
        children: [
          {
            path: 'login',
            element: <div>Login Page</div>,
          },
        ],
      },
    ]);

    const layout = renderer.create(<RouterProvider router={router} />).toJSON();
    expect(layout).toMatchSnapshot();
  });
});
