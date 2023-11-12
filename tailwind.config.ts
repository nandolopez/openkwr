import type { Config } from 'tailwindcss'

export default {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

