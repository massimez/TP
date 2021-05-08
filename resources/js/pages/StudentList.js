import { Box } from '@chakra-ui/layout'
import React from 'react'
import Filtermenu from '../components/Filtermenu'
import Header from '../components/layouts/Header'
import Pagination from '../components/layouts/Pagnation'

function StudentList() {
    return (
        <Box mx="2%">
            <Header title="Список студентов"/>
            <Pagination />
        </Box>
    )
}

export default StudentList
