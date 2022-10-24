module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      height: {
        100: '33rem'
      },
      minWidth: {
        '40': '10rem',
        '48': '12rem',
        '24': '6rem'
      },
      minHeight: {
        '48': '12rem',
      }
    },
    fontFamily: {
      sansation: ['Sansation', 'serif']
    },
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

      'lightest-blue': '#54cceb',

      'dark-blue': '#25235c',

      'link-blue': '#0074cc',

      'gray': '#7f8487',
      'gray-900': '#8c9093',
      'gray-800': '#999d9f',
      'gray-700': '#a5a9ab',
      'gray-600': '#b2b5b7',
      'gray-500': '#bfc2c3',
      'gray-400': '#cccecf',
      'gray-300': '#d9dadb',
      'gray-200': '#e5e6e7',
      'gray-100': '#f2f3f3',
      
      'white': '#FFFFFF'
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
