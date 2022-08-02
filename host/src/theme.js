import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00d59d',
    },
    secondary: {
      main: '#f69220',
    },
    info: {
      main: '#0d47a1',
      dark: '#052050',
      light: '#6684b5',
    },
    text: {
      primary: '#606060',
      light: '#9C9C9C',
      default: '#606060',
      nav: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            width: `100%`,
            color: '#fff',
          },
        },
      ],
    },
  },
  spacing: 8,
})

export default theme
