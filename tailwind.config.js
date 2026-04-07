export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        biology: {
          dna: '#3B82F6',
          protein: '#10B981',
          membrane: '#8B5CF6',
          chlorophyll: '#22C55E',
          algae: '#14B8A6',
          sand: '#F5E9D3',
          moss: '#D9E7C7',
          clay: '#D6C2A5',
          bark: '#7C5C45',
          ink: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        biology: '0 18px 40px -24px rgba(15, 23, 42, 0.35)',
      },
      borderRadius: {
        biology: '1.25rem',
      },
      fontSize: {
        caption: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
    },
  },
  plugins: [],
}
