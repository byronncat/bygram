import { Global } from '@global';
import { render } from '@testing-library/react';

describe('hoc', () => {
  describe('global', () => {
    it('should render the global hoc correctly', async () => {
      const { container } = await render(<Global>Test</Global>);
      expect(container).toMatchSnapshot();
    });
  });
});
