import type { Config } from 'tailwindcss';
import colors from "tailwindcss/colors";

export default {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      lime: colors.lime,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
