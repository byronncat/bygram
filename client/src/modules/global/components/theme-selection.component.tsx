import { useState } from 'react';
import clsx from 'clsx';
import { useThemeContext } from '../providers';
import { DisplayIcon, MoonIcon, SunIcon } from '@assets/icons';
import type { ReactProps } from '../types';

const ThemeSelection = ({ className }: ReactProps) => {
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
    <div className={className}>
      {isOpen && (
        <span
          className={clsx('w-screen h-screen', 'absolute top-0 right-0 z-10')}
          onClick={() => setIsOpen(false)}
        />
      )}
      <button
        className={clsx(
          'relative z-10',
          'hover:bg-on-surface/[0.08] dark:hover:bg-dark-on-surface/[0.12]',
          'transistion-colors duration-200 rounded-full',
          'p-2',
        )}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Theme selection</span>
        {isDarkMode ? (
          <MoonIcon
            type={theme === 'system' ? 'regular' : 'solid'}
            className={clsx(
              'w-7 h-7',
              'fill-on-surface/[0.7] dark:fill-dark-on-surface/[0.7]',
              'transition-colors duration-200',
            )}
          />
        ) : (
          <SunIcon
            type={theme === 'system' ? 'regular' : 'solid'}
            className={clsx(
              'w-7 h-7',
              'fill-on-surface/[0.7] dark:fill-dark-on-surface/[0.7]',
              'transition-colors duration-200',
            )}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={clsx(
            'mr-3 w-36',
            'absolute top-16 right-0 z-10',
            'rounded-md shadow-xl overflow-hidden',
            'bg-background dark:bg-dark-background',
            'font-medium',
            'text-on-surface/[0.60] dark:text-dark-on-surface/[0.7]',
            'border border-on-surface/[0.12] dark:border-dark-on-surface/[0.18]',
          )}
        >
          <div
            className={clsx(
              'w-full h-full',
              'bg-surface/[0.87] dark:bg-dark-surface/[0.07]',
              'divide-y divide-on-surface/[0.12] dark:divide-dark-on-surface/[0.18]',
            )}
          >
            {options.map(({ label, onClick, icon }) => (
              <button
                key={label}
                className={clsx(
                  'text-left',
                  'block w-full px-4 py-2',
                  'hover:bg-on-surface/[0.08] dark:hover:bg-dark-on-surface/[0.07]',
                )}
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
              >
                {icon({
                  color: 'red',
                  type: 'solid',
                  className: clsx(
                    'w-5 h-5 mr-2',
                    'inline-block',
                    'fill-on-surface/[0.60] dark:fill-dark-on-surface/[0.7]',
                  ),
                })}
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelection;
