import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        buttonAdjust: "988px",
        "3xl": "1920px",
      },
      colors: {
        "sp-greyish": "#DFE0F1",
        "sp-purple": "#53337B",
        "sp-purpleBright": "#A21C80",
        "sp-purpleBright2": "#6232DA",
        "sp-accent": "#A9FB1A",
        "sp-purpleHover": "#E86FEE",
        "sp-bannerWhite": "#E9EAF9",
        "sp-tp-page": "#f5f7ff",
        "sp-bt-page": "#DFE0F1",
        textNav: "#555777",
      },
      minHeight: {
        "1/2": "50%",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      gridTemplateColumns: {
        sp: "56px repeat(auto-fit, minmax(0px, 1fr))",
        nm: "repeat(auto-fit, minmax(0px, 1fr))",
        pr: "90px repeat(11, minmax(0px, 1fr))",
      },
    },
  },
  plugins: [],
} satisfies Config;
