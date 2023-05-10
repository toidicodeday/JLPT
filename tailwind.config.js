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
        primary: '#424F6F',
        obotBlue: '#039EC2',
        deepBlue: '#2192FF',
        obotBlueBg: '#73e5ff54',
        lightBlueBg: '#edf9ff',
        greenColor: '#35703B',
        orangeColor: '#F99233',
        blueColor: '#59AFFF',
        yellowColor: '#FDDB62',
        grayColor: '#585858',
        redBackground: '#ECD5D5',
        grayBackground: '#D9D9D9',
        yellowBackground: '#F8F3E3',
        blueBackground: '#EEF3F4',
        orangeButton: '#FF6659',
        redButton: '#ECD5D5',
        grayChip: '#A9A9A9',
        grayDivider: 'rgba(0,0,0,0.15)',
        grayButton: '#DEDEDE',
        grayBorder: '#9D9999',
        black: '#000000',
        redBg: '#F8EFEF',
        white: '#FFFFFF',
        navyButton: '#116476',
        greenButton: '#63DB6F',
        grayText: '#c7c3c3',
        primaryButton: '#D32F2F',
      },
    },
    fontFamily: {
      sans: ['Nunito Sans'],
      rammeto: ['Rammetto One'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
