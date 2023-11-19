import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'sp-greyish' : '#DFE0F1',
        'sp-purple' : '#53337B',
        'sp-purpleBright' : '#96429A',
      },
      backgroundImage:{
        'placeholder' : "url(/src/app/_components/assets/placeholder.png)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
