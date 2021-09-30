import { createMuiTheme }  from '@material-ui/core/styles'


const theme = createMuiTheme({
  palette: {
      primary: {
        light: '#6fbf73',
        main: '#4caf50',
        dark: '#357a38',
        contrastText: '#000',
      },
      secondary: {
        light: '#ff4569',
        main: '#6fbf73',
        dark: '#b2102f',
        contrastText: '#000',
      },
    },
  root: {
      textAlign: 'center',
  },
  button: {
      itemAlign: 'center',
    },
})
export default theme;