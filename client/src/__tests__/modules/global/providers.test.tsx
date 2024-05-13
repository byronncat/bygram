import { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  useGlobalContext,
  GlobalProvider,
  ThemeProvider,
  useThemeContext,
} from '@global';

describe('provider', () => {
  describe('global', () => {
    it('should refresh the page', async () => {
      const INIT_RENDER_COUNT = 0;
      let renderCount = INIT_RENDER_COUNT;
      const Test = () => {
        renderCount++; // Increment render count
        const { refreshPage } = useGlobalContext();

        useEffect(() => {
          refreshPage(); // Refresh page - Increment render count
        }, []);
        return <div>Test</div>;
      };

      await render(
        <GlobalProvider>
          <Test />
        </GlobalProvider>,
      );
      expect(renderCount).toBe(2);
    });
  });

  describe('theme', () => {
    it('should have dark theme default', async () => {
      const Test = () => {
        const { theme } = useThemeContext();

        return <div data-testid="theme">{theme}</div>;
      };

      const { getByTestId } = await render(
        <ThemeProvider>
          <Test />
        </ThemeProvider>,
      );

      expect(getByTestId('theme').textContent).toBe('dark');
    });

    it('should update theme', async () => {
      const Test = () => {
        const { theme, updateTheme } = useThemeContext();

        return (
          <div data-testid="theme" onClick={() => updateTheme('light')}>
            {theme}
          </div>
        );
      };

      const { getByTestId } = await render(
        <ThemeProvider>
          <Test />
        </ThemeProvider>,
      );

      const themeElement = getByTestId('theme');
      expect(themeElement.textContent).toBe('dark');

      await fireEvent.click(themeElement);
      expect(themeElement.textContent).toBe('light');
    });
  });
});
