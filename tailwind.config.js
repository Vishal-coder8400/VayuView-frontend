/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#7367f0",
        secondary: "#26d6eb",
        bg_primary: "#f7f8fb",
        bg_secondary: "#f7f8fb",
        // Add more custom colors as needed
      },
      fontFamily: {
        roboto: ["Roboto"],
        lato: ["Lato"],
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
