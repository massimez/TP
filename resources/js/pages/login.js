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

import ErrorMessage from "../components/ErrorMessage";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Header from "../components/layouts/Header";

import { Redirect } from "react-router";
import { connect } from "react-redux";

const login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async event => {
      event.preventDefault();

      setIsLoading(true);
        //
        const data = {email:email,password:password};
        setTimeout(() => { axios.post("/api/auth/login", data)
        .then( res => {
            setShowPassword(false);
            cookie.set("token",res.data.access_token);
            //cookie.set("user", res.data.user);
            props.setLogin(res.data.user);
            console.log(res)
            setIsLoading(false);
            setIsLoggedIn(true);


        }).catch(err => {
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
            setShowPassword(false);
            console.log(err.response.data.errors );
        })
    }, 1000);
    }


    const handlePasswordVisibility = () => setShowPassword(!showPassword);

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
                <Heading as="h1">Авторизация</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage message={error} />}
                  <FormControl isRequired>

                    <Input
                      type="email"
                      placeholder="Email"
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
                  </FormControl>
                  <a  href="#">
                                    Забыли пароль?
                                </a>
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
                      'Sign In'
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

const mapDispatchToProps = dispatch => {
    return {
      setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
    };
  };
  export default connect(
    null,
    mapDispatchToProps
  )(login);
