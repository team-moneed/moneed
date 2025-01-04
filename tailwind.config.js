export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'mask-gradient-right': 'linear-gradient(to left, transparent, #000 4.8rem)',
      },
      boxShadow: {
        custom: '0px 0px 30px 0px rgba(107, 110, 116, 0.20)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
};
