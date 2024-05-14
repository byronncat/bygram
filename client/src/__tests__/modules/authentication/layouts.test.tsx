import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthenticationLayout } from '@authentication';

describe('authentication layout', () => {
  it('should render correctly when not authenticated', () => {
    const { container } = render(<AuthenticationLayout title="login" />);
    expect(container).toMatchSnapshot();
  });
});
