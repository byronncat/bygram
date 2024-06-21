import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LandingPageLayout } from '@authentication';

describe('authentication layout', () => {
  it('should render correctly when not authenticated', () => {
    const { container } = render(<LandingPageLayout title="login" />);
    expect(container).toMatchSnapshot();
  });
});
