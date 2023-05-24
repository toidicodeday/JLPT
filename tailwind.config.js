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
