import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import theme from './theme'

import App from './App'

ReactDOM.render(
  <IntlProvider locale='en-EN'>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </IntlProvider>,
  document.getElementById('root')
)
