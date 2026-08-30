import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cinema: {
          950: "#050507",
          900: "#0A0A0E",
          850: "#0E0E14",
          800: "#13131D",
          700: "#1C1C2B",
          600: "#27273C",
          500: "#3E3E5C",
          400: "#717196",
          300: "#A5A5C4",
          200: "#D4D4E8",
          100: "#ECECF8",
        },
        brand: {
          purple: {
            DEFAULT: "#8B5CF6",
            light: "#A855F7",
            lighter: "#C084FC",
            dark: "#6D28D9",
            glow: "rgba(139, 92, 246, 0.25)",
          },
          orange: {
            DEFAULT: "#F97316",
            light: "#FB923C",
            lighter: "#FDBA74",
            dark: "#C2410C",
            glow: "rgba(249, 115, 22, 0.25)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "cinema-gradient": "radial-gradient(ellipse at top, #1E1236 0%, #0A0A0E 70%)",
        "orange-purple-gradient": "linear-gradient(135deg, #F97316 0%, #8B5CF6 100%)",
        "purple-glow-radial": "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
        "orange-glow-radial": "radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "glow-purple": "0 0 35px -5px rgba(139, 92, 246, 0.3)",
        "glow-orange": "0 0 35px -5px rgba(249, 115, 22, 0.3)",
        "cinema-card": "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.07)",
        "cinema-hover": "0 12px 40px -10px rgba(139, 92, 246, 0.3), inset 0 0 0 1px rgba(168, 85, 247, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
