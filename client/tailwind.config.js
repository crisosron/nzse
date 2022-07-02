module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      sansation: ['Sansation', 'serif']
    },
    colors: {
      'light-blue': '#4cbedb',
      'dark-blue': '#25235c',
      'link-blue': '#0074cc',
      'gray': '#7f8487'
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
