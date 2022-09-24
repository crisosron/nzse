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
        '48': '12rem'
      }
    },
    fontFamily: {
      sansation: ['Sansation', 'serif']
    },
    colors: {
      'light-blue': '#4cbedb',
      'lightest-blue': '#54cceb',
      'dark-blue': '#25235c',
      'link-blue': '#0074cc',
      'gray': '#7f8487',
      'white': '#FFFFFF'
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
