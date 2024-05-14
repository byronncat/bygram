/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'neon': {
          'red': '#ff0000',
        },
        'cerise': {
          '50': '#fdf2f9',
          '100': '#fde6f5',
          '200': '#fdcded',
          '300': '#fca5dd',
          '400': '#f86ec5',
          '500': '#f242ac',
          '600': '#d81d84',
          '700': '#c4126f',
          '800': '#a2125b',
          '900': '#87144e',
          '950': '#53042b',
        },
        'big-stone': {
          '50': '#f4f6fb',
          '100': '#e9edf5',
          '200': '#cedae9',
          '300': '#a3bbd6',
          '400': '#7196bf',
          '500': '#4f78a8',
          '600': '#3d608c',
          '700': '#324d72',
          '800': '#2c4360',
          '900': '#293951',
          '950': '#1e293b',
        },
        'haiti': {
          '50': '#ecebff',
          '100': '#dedbff',
          '200': '#c5beff',
          '300': '#a797ff',
          '400': '#916eff',
          '500': '#864dff',
          '600': '#812dfe',
          '700': '#7221e1',
          '800': '#5b1eb5',
          '900': '#4a218e',
          '950': '#1e0d37',
        },
      },
      fontSize: {
        '10vw': '10vw',
      },
      spacing: {
        '100': '25rem',
      },
      padding: {
        'full': '100%',
      },
      rotate: {
        '24': '24deg',
      },
    },
  },
  plugins: [],
}

