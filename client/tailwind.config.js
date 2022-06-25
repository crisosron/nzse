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
      'blue': '#4cbedb'
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
