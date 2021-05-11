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
import SuccesMessage from "../../components/SuccesMessage";

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [succes, setSucces] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            old_password: oldPassword,
            new_password: password,
            new_password_confirmation: passwordConfirmation,
        };
        setTimeout(() => {
            axios
                .post("/api/auth/updatePassword", data)
                .then((res) => {
                    setShowPassword(false);
                    setIsLoading(false);
                    setSucces("Updated!");
                })
                .catch((err) => {
                    setError("Error");
                    setIsLoading(false);
                    setShowPassword(false);
                    console.log(err);
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

                        <>
                            <Box textAlign="center">
                                <h1 className="h1-m">Смена пароля</h1>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    {succes && (
                                        <SuccesMessage message={succes} />
                                    )}
                                    <FormControl isRequired>
                                        <input
                                            className="login-input "
                                            type="password"
                                            placeholder="Прежний пароль"
                                            size="lg"
                                            onChange={(event) =>
                                                setOldPassword(
                                                    event.currentTarget.value
                                                )
                                            }
                                            autoComplete="true"
                                            required
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
                                                placeholder="Новый пароль"
                                                className="login-input "
                                                onChange={(event) =>
                                                    setPassword(
                                                        event.currentTarget
                                                            .value
                                                    )
                                                }
                                                autoComplete="current-password"
                                                required
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
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Подтверждение пароля"
                                            required
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
                                            "Подтвердить "
                                        )}
                                    </button>
                                </form>
                            </Box>
                        </>

                </Box>
            </Flex>
        </>
    );
};

export default ResetPassword;
