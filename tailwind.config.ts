import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="hacker"], [data-theme="obsidian"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family)", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      colors: {
        cute: {
          bg: "#fff5f7",
          card: "#ffffff",
          primary: "#f43f5e",
          berry: "#831843",
          border: "#fbcfe8",
        },
        hacker: {
          bg: "#000000",
          card: "rgba(4, 18, 7, 0.95)",
          primary: "#00ff41",
          muted: "#008f11",
        },
        obsidian: {
          bg: "#09090b",
          card: "rgba(24, 24, 28, 0.88)",
          primary: "#10b981",
          secondary: "#6366f1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
