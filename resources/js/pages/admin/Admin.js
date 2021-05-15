
import { Button } from '@chakra-ui/button';
import { Box,SimpleGrid,Heading } from '@chakra-ui/layout';
import React, { useState } from 'react'
import { Image, useColorModeValue, useColorMode } from "@chakra-ui/react";
import Header from '../../components/layouts/Header';
import GroupAdmin from './GroupAdmin';
import RoomsAdmin from './RoomsAdmin';
import Users from './Users'
import { Link } from "react-router-dom";
import newstudent from "../../svg/newstudent.svg";
import { Helmet } from 'react-helmet-async';

const Admin = () => {
    const [showUsers,SetShowUsers] = useState(false);
    const [showRooms,setShowRooms] = useState(false);
    const [showGroups,setShowGroups] = useState(false);
    const { toggleColorMode } = useColorMode();
    const widthitems = ["90%", null, null, null, "100%"];
    const heightitems = "294px";
    const bg = useColorModeValue("white", "blue.300");
    const color = useColorModeValue("bluet.900", "gray.800");
    return (
        //  <>
        //  <Header />
        //  <Button onClick={() => {SetShowUsers(!showUsers)} }>{showUsers ? ("Hide users"):("Show Users")}</Button>
        //   {showUsers && <Box mt={4}><Users /></Box>}
        //   <Button onClick={() => {setShowRooms(!showRooms)} }>{showRooms ? ("Hide rooms"):("Show rooms")}</Button>
        //   {showRooms && <Box mt={4}> <RoomsAdmin/></Box>}
        //   <Button onClick={() => {setShowGroups(!showGroups)} }>{showGroups ? ("Hide groups"):("Show groups")}</Button>
        //   {showGroups && <Box mt={4}> <GroupAdmin/></Box>}

        // </>
        <>
        <Box>
        <Hemlet><title>Меню администратора</title></Hemlet>
        <Header />
        <SimpleGrid
            color="bluet.100"
            //templateColumns= "repeat(auto-fit, minmax(300px, 1fr))"
            justifyItems="center"
            justifyContent="center"
            spacing="3%"
            ml={[0, null, null, "15%", "21%"]}
            mr={[0, null, null, "15%", "21%"]}
            columns={[1, null, 2, 2, 2]}
            opacity={useColorModeValue("100%", "80%")}

        >
            <Box
                width={widthitems}
                height={heightitems}
                bg={bg}
                color={color}
                borderRadius="xl"
            >
                <Link to="/roomsAdmin">
                    <Box justify="center" align="center">
                        <Image
                            src={newstudent}
                            alt="Students logo"
                            htmlWidth="357px"
                            htmlHeight="167px"
                            borderRadius="5%"
                        />
                        <Heading as="h3">Управлять комнатами</Heading>
                    </Box>
                </Link>
            </Box>
            <Box
                width={widthitems}
                height={heightitems}
                bg={bg}
                color={color}
                borderRadius="xl"
            >
                <Link to="/groupsAdmin">
                    <Box justify="center" align="center">
                        <Image
                            src={newstudent}
                            alt="Students logo"
                            htmlWidth="357px"
                            htmlHeight="167px"
                            borderRadius="5%"
                        />
                        <Heading as="h3">Группи</Heading>
                    </Box>
                </Link>
            </Box>

            <Box
                width={widthitems}
                height={heightitems}
                bg={bg}
                color={color}
                borderRadius="xl"
            >
                <Link to="/users">
                    <Box justify="center" align="center">
                        <Image
                            src={newstudent}
                            alt="Vicelinie"
                            htmlWidth="357"
                            htmlHeight="167"
                            borderRadius="5%"
                        />
                        <Heading as="h3">Пользователи</Heading>
                    </Box>
                </Link>
            </Box>

            <Box
                width={widthitems}
                height={heightitems}
                bg={bg}
                color={color}
                borderRadius="xl"
            >
                <Link to="/studentStatus">
                    <Box justify="center" align="center">
                        <img
                            src={newstudent}
                            alt="Rooms"
                            width="357"
                            height="167"
                        />
                        <Heading as="h3">Статус студентов</Heading>
                    </Box>
                </Link>
            </Box>

        </SimpleGrid>

    </Box>
        </>
    )
}
export default Admin
