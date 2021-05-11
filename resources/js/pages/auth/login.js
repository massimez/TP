import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../../sass/forms.css";
import axios from "axios";
import cookie from "js-cookie";

import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    InputGroup,
    InputRightElement,
    CircularProgress,
} from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

import ErrorMessage from "../../components/ErrorMessage";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Header from "../../components/layouts/Header";

import { Redirect } from "react-router";
import { connect } from "react-redux";

const login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);
        //
        const data = { email: email, password: password };
        setTimeout(() => {
            axios
                .post("/api/auth/login", data)
                .then((res) => {
                    setShowPassword(false);
                    cookie.set("token", res.data.access_token);
                    //cookie.set("user", res.data.user);
                    console.log(res);
                    setIsLoading(false);
                    setIsLoggedIn(true);
                    props.setLogin(res.data.user);
                    let token = cookie.get("token");
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                    axios.defaults.baseURL = "/";
                })
                .catch((err) => {
                    setError("Неверный адрес электронной почты или пароль");
                    setIsLoading(false);
                    setShowPassword(false);
                    console.log(err.response.data.errors);
                });
        }, 1000);
    };

    const handlePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Header />
            <Flex width="full" align="center" justifyContent="center">
                <Box p={8}>
                    {isLoggedIn ? (
                        <>
                            <Redirect to="/app" />
                        </>
                    ) : (
                        <>
                            <Box textAlign="center">
                                <h1 className="h1-m">Авторизация</h1>
                            </Box>
                            <Flex
                                align="center"
                                justify="center"
                                my={4}
                                textAlign="left"
                            >
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    <FormControl isRequired>
                                        <input
                                            className="login-input "
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="Email"
                                            onChange={(event) =>
                                                setEmail(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormControl isRequired mt={6}>
                                        <InputGroup>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Пароль"
                                                className="login-input "
                                                onChange={(event) =>
                                                    setPassword(
                                                        event.currentTarget
                                                            .value
                                                    )
                                                }
                                                autoComplete="current-password"
                                            />
                                            <InputRightElement
                                                width="3rem"
                                                mt="20px"
                                            >
                                                <Button
                                                    type="button"
                                                    h="1.5rem"
                                                    size="sm"
                                                    onClick={
                                                        handlePasswordVisibility
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <ViewOffIcon />
                                                    ) : (
                                                        <ViewIcon />
                                                    )}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <div>

                                        <Link to="/forget">Забыли пароль?</Link>
                                    </div>

                                    <button
                                        className="btn-login-submit "
                                        type="submit"
                                    >
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size="24px"
                                                color="teal"
                                            />
                                        ) : (
                                            "Войти"
                                        )}
                                    </button>
                                    <Flex justifyContent="space-between">
                                        <a href="/register">
                                            &nbsp;Регистрация
                                        </a>
                                    </Flex>
                                </form>
                            </Flex>
                        </>
                    )}
                </Box>
            </Flex>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user }),
    };
};
export default connect(null, mapDispatchToProps)(login);
