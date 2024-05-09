import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',

    ],

    theme: {     
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                    typing: {
                      "0%": {
                        width: "0%",
                        visibility: "hidden"
                      },
                      "100%": {
                        width: "100%"
                      }
                    },
                    blink: {
                      "50%": {
                        borderColor: "transparent"
                      },
                      "100%": {
                        borderColor: "white"
                      }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      },

      colors: {
        vermilion: {
          '50': '#fff6ec',
          '100': '#ffebd3',
          '200': '#ffd3a5',
          '300': '#ffb46d',
          '400': '#ff8932',
          '500': '#ff670a',
          '600': '#ff4d00',
          '700': '#cc3502',
          '800': '#a12a0b',
          '900': '#82250c',
          '950': '#460f04',
        },
      },
     },
    },

    plugins: [forms],
};



