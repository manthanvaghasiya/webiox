/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#002583',    // Strong Blue - Big text, footers, dark sections
          yellow: '#FFB800',  // Mustard Yellow - Buttons, glowing effects, important words
          gray: '#E5E8EF',    // Cool Light Gray - Main background
        },
        primary: {
          // Re-mapped primary to the new Strong Blue for backward compatibility with existing components
          DEFAULT: '#002583',
          50: '#eaeff8',
          100: '#d0ddef',
          200: '#a7bfe0',
          300: '#7599cd',
          400: '#4871b6',
          500: '#2c539e',
          600: '#204085',
          700: '#1b326a',
          800: '#192b58',
          900: '#182649',
          950: '#002583',
        },
        accent: {
          DEFAULT: '#FFB800',
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
        'hero-glow': 'radial-gradient(circle at center, rgba(255, 184, 0, 0.15) 0%, rgba(0, 37, 131, 0.05) 50%, transparent 100%)',
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
