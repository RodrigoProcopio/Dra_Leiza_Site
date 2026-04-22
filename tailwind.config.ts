import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "sans-serif",
        ],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#F7F7F5",
          2: "#FFFFFF",
          3: "#F1F2F4",
        },
        ink: {
          DEFAULT: "#0B1220",
          2: "#111B2E",
          muted: "#5A6475",
        },
        brand: {
          navy: "#0B1B3A",
          navy2: "#0F2A5A",
          teal: "#1E6B64",
        },
        ring: {
          DEFAULT: "#0B1B3A",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.10)",
        card: "0 8px 24px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;