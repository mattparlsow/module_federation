import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Main />
      </Container>
    </ThemeProvider>
  )
}
ReactDOM.render(<App />, document.getElementById('app'))
