
import { Box } from '@chakra-ui/layout';
import React from 'react';
import Filtermenu from '../components/Filtermenu';
import Header from '../components/layouts/Header';
import MainMenu from '../components/layouts/MainMenu';

const MainMenuPage = () => {
    return (
        <Box>
            <Header />
            <MainMenu />
        </Box>
    )
}

export default MainMenuPage;