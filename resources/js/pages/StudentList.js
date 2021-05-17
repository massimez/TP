import { Box } from '@chakra-ui/layout'
import React from 'react'
import Filtermenu from '../components/Filtermenu'
import Header from '../components/layouts/Header'
import Pagination from '../components/layouts/Pagnation'
import { Helmet } from 'react-helmet-async';

function StudentList() {
    return (
        <Box mx="2%">
            <Helmet><title>Список студентов</title></Helmet>
            <Header title="Список студентов"/>
            <Pagination />
        </Box>
    )
}

export default StudentList
