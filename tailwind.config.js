/** @type {import('tailwindcss').Config} */


function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
          white: withOpacity('--color-text-white'),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          "fill-muted": withOpacity('--color-fill-muted'),
          "fill-inverted": withOpacity('--color-fill-inverted'),
          'button-accent': withOpacity('--color-button-accent'),
          'button-accent-hover': withOpacity('--color-button-accent-hover'),
          'button-muted': withOpacity('--color-button-muted'),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity('--color-border-base'),
          inverted: withOpacity('--color-border-inverted'),
        },
      },
      fill: {
        skin: {
          primary: withOpacity('--fill-primary'),
          secondary: withOpacity('--fill-secondary'),
        },
      },
      ringColor: {
        skin: {
          primary: withOpacity('--fill-primary'),
          secondary: withOpacity('--fill-secondary'),
        }
      },

    },
  },
  plugins: [],
}
