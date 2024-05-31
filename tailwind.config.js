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
        13.5: '3.375rem',
        15: '3.75rem',
      },
      fontFamily: {
        'lexend-peta':
          'Lexend Peta, -apple-system,Arial,BlinkMacSystemFont,roboto slab,droid serif,segoe ui,Ubuntu,Cantarell,Georgia,serif',
        inter:
          'Inter, -apple-system,Arial,BlinkMacSystemFont,roboto slab,droid serif,segoe ui,Ubuntu,Cantarell,Georgia,serif',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
