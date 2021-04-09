import { Box } from '@chakra-ui/layout'
import React from 'react'
import Filtermenu from '../components/Filtermenu'
import Header from '../components/layouts/Header'
import Pagination from '../components/layouts/Pagnation'

function StudentList() {
    return (
        
            
        <Box>
            <Header title="Список студентов"/>
            <Filtermenu/>
            <Pagination />
        </Box>
    )
}

export default StudentList
