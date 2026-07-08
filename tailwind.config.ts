import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#FF7F8A',
        sunshine: '#FFD84D',
        sky: '#66C7FF',
        partyPurple: '#A78BFA',
        fresh: '#4ADE80'
      }
    }
  },
  plugins: []
};

export default config;
