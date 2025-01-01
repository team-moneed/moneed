export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'mask-gradient-right': 'linear-gradient(to left, transparent, #000 4.8rem)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
};
