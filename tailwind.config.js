/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#dbeafe', // Define your custom color
      },
    },
  },
  plugins: [],
};
