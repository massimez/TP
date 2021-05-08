
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react'
import Header from '../components/layouts/Header';
import Users from '../components/Users'

const Admin = () => {
    const [showUsers,SetShowUsers] = useState(false);
    return (
         <>
         <Header />
         <Button onClick={() => {SetShowUsers(!showUsers)} }>{showUsers ? ("Hide users"):("Show Users")}</Button>
          {showUsers && <Box mt={4}><Users /></Box>}
        </>
    )
}
export default Admin
