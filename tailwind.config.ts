import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      main: '#E5E5E5',
      second: '#5443C3',
      maindark: '#393E6F',
      seconddark: '#fff',
      lightfont: '#fff',
      darkfont: '#000',
      darkcard: '#3e447a',
      lightcard: '#ececec'
    }
  },
  plugins: [],
};
export default config;
