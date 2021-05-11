import React, { useState } from "react";
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

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        //
        const data = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        };
        setTimeout(() => {
            axios
                .post("/api/auth/register", data)
                .then((res) => {
                    setShowPassword(false);
                    // cookie.set("token",res.data.access_token);
                    //cookie.set("user", res.data.user);
                    //props.setLogin(res.data.user);
                    console.log(res);
                    setIsLoading(false);
                    setIsLoggedIn(true);
                    return <Redirect to="/app" />;
                })
                .catch((err) => {
                    setError("Invalid email or password");
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
                <Box p={8} maxWidth="500px">
                    {isLoggedIn ? (
                        <>
                            <Redirect to="/app" />
                            <Box textAlign="center">
                                <Text>{email} logged in!</Text>
                                <Button
                                    variant="outline"
                                    width="full"
                                    mt={4}
                                    onClick={() => setIsLoggedIn(false)}
                                >
                                    Sign out
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box textAlign="center">
                                <h1 className="h1-m">Регистрация</h1>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    <FormControl isRequired>
                                        <input
                                            className="login-input "
                                            type="text"
                                            placeholder="Имя"
                                            size="lg"
                                            onChange={(event) =>
                                                setName(
                                                    event.currentTarget.value
                                                )
                                            }
                                            autoComplete="true"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <input
                                            className="login-input "
                                            type="email"
                                            placeholder="Электронная почта"
                                            size="lg"
                                            onChange={(event) =>
                                                setEmail(
                                                    event.currentTarget.value
                                                )
                                            }
                                            autoComplete="true"
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
                                    <FormControl>
                                       <input
                                        className="login-input "
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Подтверждение пароля"
                                        size="lg"
                                        onChange={(event) =>
                                            setPasswordConfirmation(
                                                event.currentTarget.value
                                            )
                                        }
                                        autoComplete="current-password"
                                    />
                                    </FormControl>


                                    <button
                                        className="btn-login-submit "
                                        type="submit"
                                        width="full"
                                        mt={4}
                                    >
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size="24px"
                                                color="teal"
                                            />
                                        ) : (
                                            "Завершить регистрацию"
                                        )}
                                    </button>
                                </form>
                            </Box>
                        </>
                    )}
                </Box>
            </Flex>
        </>
    );
};

export default Register;
