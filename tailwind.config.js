/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#FAF7F2",
          200: "#F2EDE3",
          300: "#E8DFCB",
        },
        forest: {
          50: "#EEF3F0",
          100: "#D4E0DA",
          400: "#5A7A6B",
          500: "#3F5C4E",
          600: "#2D4A3E",
          700: "#22382F",
          800: "#1A2B24",
          900: "#101D17",
        },
        gold: {
          300: "#E0C589",
          400: "#D4B475",
          500: "#C9A961",
          600: "#B69045",
          700: "#967635",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
          muted: "#5C5C5C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      animation: {
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
