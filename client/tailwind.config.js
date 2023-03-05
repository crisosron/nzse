module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        100: '33rem'
      },
      minWidth: {
        40: '10rem',
        48: '12rem',
        24: '6rem'
      },
      minHeight: {
        48: '12rem'
      },
      flex: {
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%'
      }
    },
    fontSize: {
      h1: '2em',
      h2: '1.5em',
      h3: '1.17em',
      h4: '1em',
      h5: '0.83em',
      h6: '0.67em',

      // xl = original + (50% of original)
      'h1-xl': '3em',
      'h2-xl': '2.45em',
      'h3-xl': '1.76em',
      'h4-xl': '1.5em',
      'h5-xl': '1.245em',
      'h6-xl': '1em',

      // 2xl = original * 2
      'h1-2xl': '4em',
      'h2-2xl': '3em',
      'h3-2xl': '2.34em',
      'h4-2xl': '2em',
      'h5-2xl': '1.66em',
      'h6-2xl': '1.34em'
    },
    zIndex: {
      max: '9999',
      hide: '-1'
    },
    fontFamily: {
      sansation: ['Sansation', 'serif'],
      poppins: ['Poppins', 'serif']
    },

    // Useful generator: https://maketintsandshades.com/
    colors: {
      'light-blue': '#4cbedb',
      'light-blue-900': '#5ec4df',
      'light-blue-800': '#70cbe2',
      'light-blue-700': '#82d1e6',
      'light-blue-600': '#94d8e9',
      'light-blue-500': '#a6deed',
      'light-blue-400': '#b7e5f1',
      'light-blue-300': '#c9ebf4',
      'light-blue-200': '#dbf2f8',
      'light-blue-100': '#edf8fb',
      'light-blue-50': '#f7fbfd',

      'lightest-blue': '#54cceb',

      'dark-blue': '#25235c',

      'link-blue': '#0074cc',

      charcoal: '#121212',

      gray: '#7f8487',
      'gray-900': '#8c9093',
      'gray-800': '#999d9f',
      'gray-700': '#a5a9ab',
      'gray-600': '#b2b5b7',
      'gray-500': '#bfc2c3',
      'gray-400': '#cccecf',
      'gray-300': '#d9dadb',
      'gray-200': '#e5e6e7',
      'gray-100': '#f2f3f3',


      'affirmative-green': '#008000',
      'affirmative-green-400': '#99cc99',
      'alert-orange': '#ffa500',
      'alert-orange-400': '#ffdb99',
      'alert-red': '#cc0000',
      'alert-red-400': '#eb9999',

      white: '#FFFFFF'
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
