/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "primary": '#d81d84',
        "primary-variant": '#2d32d5',
        "on-primary": '#FFFFFF',
        "secondary": '#03DAC6',
        "secondary-variant": '#018786',
        "on-secondary": '#000000',
        "background": '#F0F2F5',
        "on-background": '#000000',
        "surface": '#FFFFFF',
        "on-surface": '#000000',
        "error": '#D32F2F',
        "on-error": '#FFFFFF',
        "success": "#4caf50",
        "on-success": "#FFFFFF",
        "dark": {
          "primary": '#f242ac',
          "primary-variant": '#d81d84',
          "on-primary": '#000000',
          "secondary": '#03DAC6',
          "secondary-variant": '#018786',
          "on-secondary": '#000000',
          "background": '#121212',
          "on-background": '#FFFFFF',
          "surface": '#FFFFFF',
          "on-surface": '#FFFFFF',
          "error": '#D32F2F',
          "on-error": '#000000',
          "success": "#00C853",
          "on-success": "#FFFFFF",
        },
        'love': '#FF3131',
      },
      fontSize: {
        '10vw': '10vw',
      },
      spacing: {
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '190': '47.5rem',
        '250': '62.5rem',
        'md': '48rem',
        'lg': '64rem',
      },
      padding: {
        'full': '100%',
      },
      rotate: {
        '24': '24deg',
      },
      borderWidth: {
        '3': '3px',
      },
      aspectRatio: {
        '9/16': '9 / 16',
      }
    },
  },
  plugins: [],
}

