import React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from "@chakra-ui/react"
import App from './App';
import { ChakraProvider , CSSReset , extendTheme,ThemeProvider} from '@chakra-ui/react';
import  "@fontsource/montserrat/cyrillic-ext-900.css";
import {theme,config} from './theme/theme.js'


ReactDOM.render(
  <>
  <React.StrictMode>
    <ChakraProvider >
    <ThemeProvider theme={theme}>
     <CSSReset config={config}/>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App / >
    </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
