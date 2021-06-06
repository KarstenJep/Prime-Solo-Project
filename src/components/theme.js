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
      
    // paperContainer: {
    //     backgroundImage: `url(${"https://images.unsplash.com/photo-1611004666332-0d1298c1096f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"})`
    //   },
})
export default theme