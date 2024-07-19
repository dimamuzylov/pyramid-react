const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        0.25: '0.0625rem',
        12.5: '3.125rem',
        13.5: '3.375rem',
        15: '3.75rem',
      },
      width: {
        18.5: '4.625rem',
        22.5: '5.625rem',
      },
      fontFamily: {
        'lexend-peta':
          'Lexend Peta, -apple-system,Arial,BlinkMacSystemFont,roboto slab,droid serif,segoe ui,Ubuntu,Cantarell,Georgia,serif',
        inter:
          'Inter, -apple-system,Arial,BlinkMacSystemFont,roboto slab,droid serif,segoe ui,Ubuntu,Cantarell,Georgia,serif',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          100: 'rgb(164, 164, 164)',
        },
        primary: {
          10: '#f0ecf7',
          20: '#e0d9ee',
          30: '#d1c6e6',
          40: '#c1b3de',
          50: '#b2a0d6',
          60: '#a28ccd',
          70: '#9379c5',
          80: '#8366bd',
          90: '#7453b4',
          100: '#6440AC',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
