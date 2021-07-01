import { Box, Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/layout";
import { Image, useColorModeValue, useColorMode } from "@chakra-ui/react";
import React from "react";
import vesilit from "../../svg/vesilit.png";
import students from "../../svg/students.png";
import rooms from "../../svg/rooms.png";
import newStudent from "../../svg/newStudent.png";
import { Link } from "react-router-dom";

const MainMenu = () => {
    const { toggleColorMode } = useColorMode();
    const widthitems = ["90%", null, null, null, "100%"];
    const heightitems = "294px";
    const bg = useColorModeValue("white", "blue.300");
    const color = useColorModeValue("bluet.900", "gray.800");

    return (
        <Box>
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
                    <Link to="/students">
                        <Box justify="center" align="center">
                            <Image
                                src={students}
                                alt="Students logo"
                                width="357px"
                                height="167px"
                                borderRadius="5%"
                            />
                            <Heading as="h3">Список студентов</Heading>
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
                    <Link to="/addresident">
                        <Box justify="center" align="center">
                            <Image
                                src={newStudent}
                                alt="Students logo"
                                width="357px"
                                height="167px"
                                borderRadius="5%"
                            />
                            <Heading as="h3">Новый студент</Heading>
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
                    <Link to="/viseleni">
                        <Box justify="center" align="center">
                            <Image
                                src={vesilit}
                                alt="Vicelinie"
                                width="357"
                                height="167"
                                borderRadius="5%"
                            />
                            <Heading as="h3">Выселенные</Heading>
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
                    <Link to="/rooms">
                        <Box justify="center" align="center">
                            <img
                                src={rooms}
                                alt="Rooms"
                                width="357"
                                height="167"
                            />
                            <Heading as="h3">Комнаты</Heading>
                        </Box>
                    </Link>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default MainMenu;
