import React from 'react'
import { extendTheme, NativeBaseProvider } from 'native-base'
import Login from './src/Login/'
import { WalletProvider } from './src/contexts/WalletContext'
const theme = extendTheme({
  colors: {
    primary: '#1ECAD3',
    secondary: '#002B49',
    lightBlue: '#E5FFF9',
    lightGreen: '#00FFC2',
    yellow: '#FCFF6C',
    subtitles: '#444444',
  },
})

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <WalletProvider>
        <Login />
      </WalletProvider>
    </NativeBaseProvider>
  )
}
