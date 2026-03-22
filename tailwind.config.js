// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src//*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/**  @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hoverBrandPink: "#FF225C",
        brandPink: "#F73298",
        bannerColor: "#FEE5EA",
        bgColor: "#FDF1F5",
        footerColor: "#E7006E",
      },
    },
  },
  plugins: [],
};
