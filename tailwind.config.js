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
      animation: {
        "snackbar-top": "slideDown 0.5s ease-in-out",
        "snackbar-bottom": "slideUp 0.5s ease-in-out",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
};
