/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"EB Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "#ffffff",
        foreground: "#1a1a1a",
        muted: "#6b6b6b",
        subtle: "#f5f5f5",
        border: "#e5e5e5",
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['1.75rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      },
      spacing: {
        'section': '8rem',
        'section-sm': '5rem',
      },
    },
  },
  plugins: [],
};
