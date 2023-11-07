import type { Config } from 'tailwindcss';
import * as tailwindColors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...tailwindColors,
      main: '#1e1e27',
      secondary: '#30313c',
      bgc: '#313442',
      category: '#24252e',
      'gray-accent': '#9B9D9F',
      'category-bd': '#323443',
      buttons: '#2e2f3c',
    },
  },
  plugins: [],
}
export default config
