/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  important: true,
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'login-pattern': "url('/src/assets/img/images/background.png')",
        'welcome-pattern': "url('/src/assets/img/images/welcome.png')",
      },
      colors: {
        primary: '#FF261F',
        secondPrimary: '#FFCAD4',
        haiti: '#171738',
        electricBlue: '#8EF9F3',
        darkSlateBlue: '#593C8F',
        aquaGreen: '#16DB93',
        selectiveYellow: '#FFB800',
        smokeyGrey: '#707070',
        borderColor: '#D9D9D9',
        crystalBlue: '#61AAFF',
      },
    },
    fontFamily: {
      sans: ['Nunito Sans'],
      inter: ['Inter'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
