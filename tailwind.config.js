/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#8b0000", //kırmızı
        secondary: "#0d0e11", // siyah
        tertiary:'#f8fafc' //slate-50
      },
    },
    screens: {
      sm: { min: "0", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1099px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1100px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ..... }
    },
  },
  plugins: [],
};
