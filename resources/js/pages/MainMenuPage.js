
import { Box, Divider } from '@chakra-ui/layout';
import React from 'react';
import Filtermenu from '../components/Filtermenu';
import Header from '../components/layouts/Header';
import MainMenu from '../components/layouts/MainMenu';
import { Helmet } from 'react-helmet-async';

const MainMenuPage = () => {
    return (
        <Box >
            <Helmet><title>Приложение главного меню</title></Helmet>
            <Header />
            <MainMenu />
        </Box>
    )
}

export default MainMenuPage;
