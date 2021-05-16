import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import {
    ChakraProvider,
    CSSReset,
    extendTheme,
    ThemeProvider,
} from "@chakra-ui/react";
import "@fontsource/montserrat/cyrillic-ext-900.css";
import { theme, config } from "./theme/theme.js";
import store from "./store/index";
import { Provider } from "react-redux";
import axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router";
import {  HelmetProvider } from 'react-helmet-async';

let token = cookie.get("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = "https://apple-sundae-02076.herokuapp.com/";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <React.StrictMode>
                <ChakraProvider>
                    <ThemeProvider theme={theme}>
                        <CSSReset config={config} />
                        <ColorModeScript
                            initialColorMode={theme.config.initialColorMode}
                        />
                         <HelmetProvider>
                            <App />
                         </HelmetProvider>

                    </ThemeProvider>
                </ChakraProvider>
            </React.StrictMode>
        </Provider>,
        document.getElementById("root")
    );
};

if (token) {
    axios
        .post("/api/auth/me")
        .then((res) => {
            store.dispatch({ type: "SET_LOGIN", payload: res.data });
            render();;
        })
        .catch((err) => {
            render();
        })

} else {
    render();
}

