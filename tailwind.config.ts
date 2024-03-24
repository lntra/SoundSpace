import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'sp-greyish' : '#DFE0F1',
        'sp-purple' : '#53337B',
        'sp-purpleBright' : '#A21C80',
        'sp-purpleBright2' : '#96429A',
        'sp-purpleHover' : '#D05FD6',
        'sp-bannerWhite' : '#E9EAF9',
        'sp-tp-page' : '#E9EAF9',
        'sp-bt-page' : '#DFE0F1',
      },
      minHeight: {
        '1/2': '50%',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      gridTemplateColumns: {
        'sp': '56px repeat(auto-fit, minmax(0px, 1fr))',
        'nm': 'repeat(auto-fit, minmax(0px, 1fr))',
        'pr': '90px repeat(11, minmax(0px, 1fr))',
      }
    },
  },
  plugins: [],
} satisfies Config;
