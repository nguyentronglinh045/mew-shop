/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        'main-color': '#d70018'
      },
      boxShadow: {
        box_shadow: '0 0px 2px 0 rgba(60,64,67,0.1), 0 0px 6px 0px rgba(60,64,67,0.25)',
        'box_shadow-hover': '0 0px 2px 0 #d70018,0 0px 6px 0px #d70018'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1370px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '10px',
          paddingRight: '10px'
        },
        '.centered': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
    })
  ]
}
