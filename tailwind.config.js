export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
};
