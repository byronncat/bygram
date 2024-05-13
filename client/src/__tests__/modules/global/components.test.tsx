import { fireEvent, render } from '@testing-library/react';
import { Loader, Overlay } from '@global';

describe('components', () => {
  describe('loader', () => {
    it('should render the loader correctly', async () => {
      const { container } = await render(<Loader />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('overlay', () => {
    it('should render the overlay correctly', async () => {
      const exitHandler = jest.fn();

      const { container } = await render(
        <Overlay exitHandler={exitHandler}>
          <div>Test</div>
        </Overlay>,
      );
      expect(container).toMatchSnapshot();
    });

    it('should call the exitHandler when the overlay is clicked', async () => {
      const exitHandler = jest.fn();

      const { container } = await render(
        <Overlay exitHandler={exitHandler}>
          <div>Test</div>
        </Overlay>,
      );

      const overlay = container.querySelector('.overlay');
      if (overlay) await fireEvent.click(overlay);
      const exitButton = container.querySelector('button');
      if (exitButton) await fireEvent.click(exitButton);

      expect(exitHandler).toHaveBeenCalledTimes(2);
    });
  });
});
