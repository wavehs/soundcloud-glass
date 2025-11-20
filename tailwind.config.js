/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          base: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          highlight: "rgba(255, 255, 255, 0.2)",
        }
      },
      boxShadow: {
        'glass-inset': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'neon': '0 0 20px rgba(100, 200, 255, 0.3)',
      }
    },
  },
  plugins: [],
}