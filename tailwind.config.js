/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f9f8ee",
          100: "#f1eed2",
          200: "#e3dea6",
          300: "#d4cd79",
          400: "#bfae4d",
          500: "#9d8c2d", // base gold
          600: "#2c2c2c", // dark gray
          700: "#6f621f",
          800: "#584d18",
          900: "#423a12",
        },
      },
    },
  },
  plugins: [],
};
