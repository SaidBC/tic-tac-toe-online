/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkblue-900": "rgb(16 33 43)",
        "darkblue-800": "rgb(26 43 51)",
        "darkblue-700": "rgb(30 54 64)",
        "skyblue-clr": "rgb(49 196 190)",
        "skyblue-shadow-clr": "rgb(21 137 134)",
        "yellow-clr": "rgb(242 178 54)",
        "yellow-shadow-clr": "rgb(207 137 19)",
        "gray-clr": "rgb(169 190 201)",
        "gray-shadow-clr": "rgb(131, 146, 155)",
      },
      fontFamily: {
        rubik: "rubik ,sans-serif",
      },
      boxShadow: {
        container: `0 0.5rem theme(colors.darkblue-900)`,
        ["container-sm"]: `0 0.25rem theme(colors.darkblue-900)`,
      },
    },
  },
  plugins: [],
};
