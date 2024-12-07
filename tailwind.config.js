/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'stateSize': 'calc(16px * var(--pixel-size))'
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': {
          '--pixel-size': '4',
        },
      });
    },
  ],
};