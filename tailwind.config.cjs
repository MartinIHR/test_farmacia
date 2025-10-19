module.exports = {
  // Config minimal para Tailwind v4 (usando CSS-first con @source en CSS)
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          DEFAULT: '#00BFFF',
          50: '#e6f7ff',
          100: '#cfeefe',
        },
        neutral: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
        },
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
      boxShadow: {
        soft: '0 6px 18px rgba(2,6,23,0.06)',
      },
    },
  },
  plugins: [],
};