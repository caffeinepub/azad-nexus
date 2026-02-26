/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "oklch(0.32 0.09 145)",
          foreground: "oklch(0.97 0.01 85)",
          light: "oklch(0.45 0.1 145)",
          dark: "oklch(0.22 0.07 145)",
        },
        secondary: {
          DEFAULT: "oklch(0.75 0.12 75)",
          foreground: "oklch(0.18 0.03 60)",
        },
        gold: {
          DEFAULT: "oklch(0.72 0.14 75)",
          light: "oklch(0.88 0.08 80)",
          dark: "oklch(0.55 0.12 70)",
          50: "oklch(0.96 0.03 80)",
          100: "oklch(0.92 0.06 80)",
          200: "oklch(0.86 0.09 78)",
          300: "oklch(0.80 0.11 76)",
          400: "oklch(0.75 0.13 75)",
          500: "oklch(0.70 0.14 74)",
          600: "oklch(0.62 0.13 72)",
          700: "oklch(0.52 0.11 70)",
        },
        green: {
          deep: "oklch(0.28 0.09 145)",
          mid: "oklch(0.38 0.1 145)",
          light: "oklch(0.55 0.1 145)",
          50: "oklch(0.96 0.02 145)",
          100: "oklch(0.90 0.04 145)",
          200: "oklch(0.80 0.07 145)",
          300: "oklch(0.65 0.09 145)",
          400: "oklch(0.52 0.1 145)",
          500: "oklch(0.42 0.1 145)",
          600: "oklch(0.35 0.09 145)",
          700: "oklch(0.28 0.09 145)",
          800: "oklch(0.22 0.07 145)",
          900: "oklch(0.16 0.05 145)",
        },
        cream: {
          DEFAULT: "oklch(0.96 0.025 85)",
          dark: "oklch(0.90 0.04 80)",
          50: "oklch(0.98 0.01 85)",
          100: "oklch(0.96 0.025 85)",
          200: "oklch(0.92 0.04 82)",
          300: "oklch(0.87 0.05 80)",
        },
        destructive: {
          DEFAULT: "oklch(0.55 0.22 25)",
          foreground: "oklch(0.97 0.01 85)",
        },
        muted: {
          DEFAULT: "oklch(0.92 0.02 80)",
          foreground: "oklch(0.48 0.04 70)",
        },
        accent: {
          DEFAULT: "oklch(0.88 0.06 80)",
          foreground: "oklch(0.22 0.05 60)",
        },
        popover: {
          DEFAULT: "oklch(0.98 0.01 85)",
          foreground: "oklch(0.18 0.03 60)",
        },
        card: {
          DEFAULT: "oklch(0.97 0.015 80)",
          foreground: "oklch(0.18 0.03 60)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        'gold': '0 4px 20px oklch(0.72 0.14 75 / 0.25)',
        'gold-lg': '0 8px 40px oklch(0.72 0.14 75 / 0.3)',
        'green': '0 4px 20px oklch(0.32 0.09 145 / 0.25)',
        'green-lg': '0 8px 40px oklch(0.32 0.09 145 / 0.3)',
        'card': '0 2px 12px oklch(0.18 0.03 60 / 0.08)',
        'card-hover': '0 8px 30px oklch(0.18 0.03 60 / 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
