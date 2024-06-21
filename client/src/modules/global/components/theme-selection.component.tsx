import { useState } from 'react';
import clsx from 'clsx';
import { DisplayIcon, MoonIcon, SunIcon } from '@assets/icons';
import { useThemeContext } from '../providers';

const ThemeSelection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isDarkMode, setLightTheme, setDarkTheme, setSystemTheme } =
    useThemeContext();
  const options = [
    { label: 'Light', onClick: setLightTheme, icon: SunIcon },
    { label: 'Dark', onClick: setDarkTheme, icon: MoonIcon },
    { label: 'System', onClick: setSystemTheme, icon: DisplayIcon },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={clsx('absolute top-0 right-0 z-10')}>
      <button
        className={clsx(
          'appearance-none',
          'p-1 m-4',
          'bg-background dark:bg-dark-background',
        )}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Theme selection</span>
        {isDarkMode ? (
          <MoonIcon
            type={theme === 'system' ? 'regular' : 'solid'}
            className={clsx(
              'w-6 h-6',
              'fill-on-background/[0.7] dark:fill-dark-on-background/[0.7]',
              'hover:fill-on-background dark:hover:fill-dark-on-background',
              'transition-colors duration-300',
            )}
          />
        ) : (
          <SunIcon
            type={theme === 'system' ? 'regular' : 'solid'}
            className={clsx(
              'w-6 h-6',
              'fill-on-background/[0.7] dark:fill-dark-on-background/[0.7]',
              'hover:fill-on-background dark:hover:fill-dark-on-background',
              'transition-colors duration-300',
            )}
          />
        )}
      </button>
      {isOpen && (
        <>
          <span
            className={clsx(
              'w-screen h-screen',
              'absolute top-0 right-0 -z-10',
            )}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={clsx(
              'mr-3 w-36',
              'absolute right-0',
              'rounded-md shadow-xl overflow-hidden',
              'bg-on-background/[0.01] dark:bg-dark-on-background/[0.07]',
              'font-medium',
              'text-on-background/[0.60] dark:text-dark-on-background/[0.60]',
            )}
          >
            {options.map(({ label, onClick, icon }) => (
              <button
                key={label}
                className={clsx(
                  'text-left',
                  'block w-full px-4 py-2',
                  'hover:bg-on-background/[0.08] dark:hover:bg-dark-on-background/[0.07]',
                )}
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
              >
                {icon({
                  color: 'red',
                  className: clsx(
                    'w-5 h-5 mr-2',
                    'inline-block',
                    'fill-on-background/[0.60] dark:fill-dark-on-background/[0.60]',
                  ),
                })}
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelection;
