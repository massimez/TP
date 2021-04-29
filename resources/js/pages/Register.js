import React, { useState } from "react";

import axios from 'axios'
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
  } from "@chakra-ui/react"

import ErrorMessage from "../components/ErrorMessage";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Header from "../components/layouts/Header";

import { Redirect } from "react-router";
import { connect } from "react-redux";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async event => {
      event.preventDefault();

      setIsLoading(true);
        //
        const data = {name:name,email:email,password:password,password_confirmation:passwordConfirmation};
        setTimeout(() => { axios.post("/api/auth/register", data)
        .then( res => {
            setShowPassword(false);
           // cookie.set("token",res.data.access_token);
            //cookie.set("user", res.data.user);
            //props.setLogin(res.data.user);
            console.log(res)
            setIsLoading(false);
            setIsLoggedIn(true);
           return  <Redirect to="/app" />


        }).catch(err => {
            setError('Invalid email or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
            setShowPassword(false);
            console.log(err.response.data.errors );
        })
    }, 1000);
    }


    const handlePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);}

    return (
        <>
        <Header/>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
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
                <Heading as="h1">Регистрация</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage message={error} />}
                  <FormControl isRequired>

                    <Input
                      type="text"
                      placeholder="Имя"
                      size="lg"
                      onChange={event => setName(event.currentTarget.value)}
                    autoComplete="true"/>
                  </FormControl>
                  <FormControl isRequired>
                  <Input
                      type="email"
                      placeholder="Электронная почта"
                      size="lg"
                      onChange={event => setEmail(event.currentTarget.value)}
                    autoComplete="true"/>
                  </FormControl>
                  <FormControl isRequired mt={6}>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        size="lg"
                        onChange={event => setPassword(event.currentTarget.value)}
                        autoComplete="current-password" />
                      <InputRightElement width="3rem" my="auto">
                        <Button
                        type="button"
                          h="1.5rem"
                          size="sm"
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? (
                            <ViewOffIcon />
                          ) : (
                            <ViewIcon />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Подтверждение пароля"
                        size="lg"
                        onChange={event => setPasswordConfirmation(event.currentTarget.value)}
                        autoComplete="current-password" />
                  </FormControl>



                  <Button className="btn-login-submit "
                    variant="outline"
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
                      'Завершить регистрацию'
                    )}
                  </Button>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Flex>
      </>
    );
};


  export default Register ;
