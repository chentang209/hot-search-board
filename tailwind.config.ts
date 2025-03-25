import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hot-red': {
          '50': '#fff1f2',
          '100': '#ffe4e6',
          '200': '#fecdd3',
          '300': '#fda4af',
          '400': '#fb7185',
          '500': '#f43f5e',
          '600': '#e11d48',
          '700': '#be123c',
          '800': '#9f1239',
          '900': '#881337',
          '950': '#4c0519',
        },
        'hot-pink': {
          '50': '#fdf2f8',
          '100': '#fce7f3',
          '200': '#fbcfe8',
          '300': '#f9a8d4',
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#db2777',
          '700': '#be185d',
          '800': '#9d174d',
          '900': '#831843',
          '950': '#500724',
        },
        'weibo-red': '#FF3E6D',
        'weibo-orange': '#FF8200',
        'weibo-yellow': '#FFC300',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; 