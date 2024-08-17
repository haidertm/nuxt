import sfTypography from '@storefront-ui/typography';
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';
import type { Config } from 'tailwindcss';

type AddComponentsFunction = (components: Record<string, any>) => void;

export default {
  presets: [tailwindConfig],
  content: ['./{components,pages}/**/*.vue', '../../node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
  theme: {
    extend: {
      keyframes: {
        'zoom-in-zoom-out': {
          '0%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.22, 1.12)' },
          '100%': { transform: 'scale(1, 1)' }
        }
      },
      animation: {
        'zoom-in-zoom-out': 'zoom-in-zoom-out 6s ease infinite'
      },
      colors: {
        primary: {
          light: '#2a285a',
          medium: '#29275B',
          dark: '#241464'
        },
        secondary: '#0fa897',
        silver: {
          DEFAULT: '#F5F4F4',
          light: '#F1F1F1',
          medium: '#71717A',
          dark: '#E4E4E7'
        },
        black: '#18181B',
        dark: {
          black: '#000000'
        },
        blue: {
          light: '#1E3A8A',
          dark: '#172554',
          medium: '#27215C'
        },
        skyblue: {
          dark: '#0284C7'
        },
        grey: {
          light: '#F4F4F5',
          medium: '#606060',
          dark: '#444',
          bright: '#EDEDED'
        },
        gray: {
          quartz: '#4A4A4A',
          medium: '#4F4F4F',
          dark: '#484340',
          light: '#D4D4D8'
        },
        mexicanPink: '#EC048C',
        darkgray: {
          medium: '#FAFAFA',
          quartz: '#DEDAD9'
        },
        green: '#04B39B'
      },
      gridTemplateAreas: {
        'product-page': ['left-top right', 'left-bottom right']
      },
      gridTemplateColumns: {
        'product-page': 'minmax(56%, 500px) auto'
      },
      gridTemplateRows: {
        'category-sidebar': 'min-content auto min-content'
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        '2md': '992px',
        lg: '1024px',
        '2lg': '1200px',
        xl: '1280px',
        '2xl': '1366px',
        mac: { raw: '(max-width: 1500px)' },
        '1tab': { raw: '(max-width: 1199px)' },
        '2tab': { raw: '(max-width: 1149px)' },
        tab: { raw: '(max-width: 991px)' },
        mp: { raw: '(max-width: 767px)' },
        smp: { raw: '(max-width: 639px)' },
        '4xs': { raw: '(max-width: 480px)' },
        small: { raw: '(max-width: 359px)' },
        smallest: { raw: '(max-width: 319px)' },
        'tablet-range': { min: '576px', max: '767px' }
      },
      fontSize: {
        '11': '11px',
        '13': '13px',
        '15': '15px',
        '17': '17px'
      },
      fontFamily: {
        text: ['Red Hat Display', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        gillSansRegular: ['GillSansMT', 'sans-serif'],
        gillSansBold: ['GillSansBold', 'sans-serif'],
        arcamajora: ['Arcamajora3', 'sans-serif']
      }
    }
  },
  plugins: [
    sfTypography,
    require('@savvywombat/tailwindcss-grid-areas'),
    function ({ addComponents }: { addComponents: AddComponentsFunction }) {
      addComponents([
        {
          '.container': {
            width: '100%',
            maxWidth: '100%',
            paddingRight: '8px',
            paddingLeft: '8px',
            margin: '0 auto',
            '@screen md': {
              width: '752px'
            },
            '@screen 2md': {
              width: '976px'
            },
            '@screen 2lg': {
              width: '1280px'
            },
            '@screen 2xl': {
              width: '1466px'
            }
          }
        }
      ]);
    }
  ],
  corePlugins: {
    container: false
  }
} as Config;
