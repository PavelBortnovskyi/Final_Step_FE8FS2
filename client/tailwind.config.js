/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'];
export const theme = {
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },

  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  },
  extend: {
    colors: {
      blue: '#1fb6ff',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
    spacing: {
      128: '32rem',
      144: '36rem',
    },
  },
};
export const plugins = [];
