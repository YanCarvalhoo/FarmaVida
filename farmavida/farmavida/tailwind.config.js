/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        ink: "#1D2420",
        forest: {
          50: "#EAF1EE",
          100: "#CFE0D8",
          300: "#7FA895",
          500: "#2F5D50",
          600: "#234A3F",
          700: "#1F4B3F",
          800: "#163730",
          900: "#0F2A23",
        },
        amber: {
          50: "#FCF1DE",
          200: "#F3CE8D",
          300: "#EFBC62",
          400: "#E8A83E",
          500: "#E0972E",
          600: "#C27E1D",
        },
        line: "#E4DFD3",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(29,36,32,0.04), 0 1px 0 rgba(29,36,32,0.03)",
        lift: "0 8px 24px -8px rgba(15,42,35,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        bounce1: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: 0.5 },
          "40%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "slide-up": "slide-up 0.28s cubic-bezier(0.32,0.72,0,1) both",
        "pop-in": "pop-in 0.18s ease-out both",
        bounce1: "bounce1 1.1s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
