module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      '1100': '1100px',
      '550': '550px',
    },
    minWidth: {
      'none': 'none',
    },
    Width:{
      '300': '300px',
    },
    extend: {
      colors: {
        'nav-color': 'rgba(0, 0, 0, 0.4)',
        'b-color-hover': 'rgba(255, 255, 255, 0.2)',
        'b-color-active': 'rgba(255, 255, 255, 0.4)',
      }

    },
  },
  plugins: [],
}