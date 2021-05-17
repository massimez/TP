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
import SuccesMessage from "../../components/SuccesMessage";



const ForgetPassword = () => {
    const [error, setError] = useState("");
    const [succes, setSucces] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email , setEmail] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        //
        const data = {
            email: email,
        };
        setTimeout(() => {
            axios
                .get("/api/auth/forget_password", data)
                .then((res) => {
                    setIsLoading(false);
                    setIsLoggedIn(true);
                    setSucces("Сообщение с новым паролем успешно отправлено на вашу эл.почту")
                })
                .catch((err) => {
                    setError("Неверный адрес электронной почты");
                    setIsLoading(false);

                });
        }, 1000);
    };


    return (
        <>
            <Header />
            <Flex width="full" align="center" justifyContent="center">
                <Box p={8} maxWidth="500px">

                        <>
                            <Box textAlign="center">
                                <h1 className="h1-m">Восстановить пароль</h1>
                                <h1>Укажите эл. почту, и мы пришлем вам ссылку для смены пароля.</h1>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    {succes && <SuccesMessage message={succes} />}

                                    <FormControl isRequired>
                                        <input
                                            className="login-input "
                                            type="email"
                                            placeholder="Введите электронную почту"
                                            size="lg"
                                            onChange={(event) =>
                                                setEmail(
                                                    event.currentTarget.value
                                                )
                                            }
                                            autoComplete="true"
                                            required
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
                                            "Отправить"
                                        )}
                                    </button>
                                </form>
                            </Box>
                        </>
                </Box>
            </Flex>
        </>
    );
}

export default ForgetPassword
