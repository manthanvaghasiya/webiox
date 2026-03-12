/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfc',
          100: '#ccfbf7',
          200: '#99f6ef',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#025f61', // Agency specified primary #025f61 is close to 950/deep teal
          DEFAULT: '#025f61', // Use explicitly as default primary
        },
        dark: {
          DEFAULT: '#0a0a0a',
          100: '#171717',
          200: '#262626',
          300: '#404040',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right bottom, rgba(2, 95, 97, 0.9), rgba(2, 95, 97, 0.4))',
      }
    },
  },
  plugins: [],
}
