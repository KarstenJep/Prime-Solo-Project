import { createMuiTheme }  from '@material-ui/core/styles'


const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#6fbf73',
          main: '#4caf50',
          dark: '#357a38',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff4569',
          main: '#ff1744',
          dark: '#b2102f',
          contrastText: '#000',
        },
      },
})
export default theme