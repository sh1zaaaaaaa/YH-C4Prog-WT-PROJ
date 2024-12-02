/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./*.html",
      "./src/**/*.{html,js,ts,tsx}",
  ],
  theme: {
      screens: {
      sm: '640px', // Small devices
      md: '768px', // Medium devices
      lg: '1024px', // Large devices
      xl: '1280px', // Extra large devices
      },
    extend: {
        fontFamily: {
            sans: ['Arial', 'sans-serif']
        },
    },
  },
  plugins: [],
}

