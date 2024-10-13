/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      indigo: {
        500: "#6366f1",
        700: "#4338ca",
        800: "#3730a3",
      },
      gray: {
        300: "#d1d5db",
        400: "#9ca3af",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      red: {
        400: "#f87171",
        700: "#b91c1c",
        900: "#7f1d1d",
      },
      yellow: {
        400: "#facc15",
      },
      green: {
        800: "#166534",
        900: "#14532d",
      },
    },
  },
  plugins: [],
};
