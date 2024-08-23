/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan all HTML and TypeScript files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        primary: {
          0: "#191C24",
        },
        // Grey Colors
        grey: 
        {
          0: "#fff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // {
        //   0: "#18212f",
        //   50: "#111827",
        //   100: "#1f2937",
        //   200: "#374151",
        //   300: "#4b5563",
        //   400: "#6b7280",
        //   500: "#9ca3af",
        //   600: "#d1d5db",
        //   700: "#e5e7eb",
        //   800: "#f3f4f6",
        //   900: "#f9fafb",
        // },
        // Additional Colors
        customBlue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        customIndigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },
    },
  },
  plugins: [],
};
