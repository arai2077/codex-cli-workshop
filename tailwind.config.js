/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(222 13% 24%)',
        input: 'hsl(222 13% 24%)',
        ring: 'hsl(210 40% 70%)',
        background: 'hsl(222 13% 13%)',
        foreground: 'hsl(210 40% 96%)',
        primary: {
          DEFAULT: 'hsl(210 40% 90%)',
          foreground: 'hsl(222 13% 13%)',
        },
        secondary: {
          DEFAULT: 'hsl(222 13% 22%)',
          foreground: 'hsl(210 40% 96%)',
        },
        muted: {
          DEFAULT: 'hsl(222 13% 20%)',
          foreground: 'hsl(215 20% 60%)',
        },
        accent: {
          DEFAULT: 'hsl(222 13% 22%)',
          foreground: 'hsl(210 40% 96%)',
        },
        card: {
          DEFAULT: 'hsl(222 13% 17%)',
          foreground: 'hsl(210 40% 96%)',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
