import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/layout";
import { Image, useColorModeValue,useColorMode } from "@chakra-ui/react";
import React from "react";
import studentsmenu from "../../svg/studentsmenu.svg";
import rooms from "../../svg/rooms.svg";
import newstudent from "../../svg/newstudent.svg";
import vesili from "../../svg/vesili.svg";
import { Link } from "react-router-dom";

const MainMenu = () => {

  const { toggleColorMode } = useColorMode()
  const widthitems = ["90%", null, null, null, "100%"];
  const heightitems = "294px";
  const bg = useColorModeValue("white", "blue.300")
  const color = useColorModeValue("bluet.900", "gray.800")

  return (
    <Box>
      <SimpleGrid
        color="bluet.100"
        //templateColumns= "repeat(auto-fit, minmax(300px, 1fr))"
        justifyItems="center"
        justifyContent="center"
        spacing="3%"
        ml={[0, null, null, "21%", "21%"]}
        mr={[0, null, null, "21%", "21%"]}
        columns={[1, null, null, null, 2]}
        opacity={useColorModeValue("100%","80%")} 
      >
        <Box width={widthitems} height={heightitems} bg={bg} color={color} borderRadius="xl" >
          <Link to="/students">
            <Box
              justify="center"
              align="center"
            >
              <img src={studentsmenu} alt="Students logo" htmlWidth="357" htmlHeight="167"  borderRadius="5%"/>
              <Heading as="h3">Список студентов</Heading>
            </Box>
          </Link>
        </Box>
        <Box width={widthitems} height={heightitems} bg={bg} color={color} borderRadius="xl" >
          <Link to="/students">
            <Box
              justify="center"
              align="center"
            >
              <img src={newstudent} alt="Students logo" htmlWidth="357" htmlHeight="167" borderRadius="5%"/>
              <Heading as="h3">Новый студент</Heading>
            </Box>
          </Link>
        </Box>

        <Box width={widthitems} height={heightitems} bg={bg} color={color} borderRadius="xl">
          <Box
            justify="center"
            align="center"
          >
            <img src={vesili} alt="Vicelinie" htmlWidth="357" htmlHeight="167" borderRadius="5%"/>
            <Heading as="h3">Выселенные</Heading>
          </Box>
        </Box>

        <Box width={widthitems} height={heightitems} bg={bg} color={color} borderRadius="xl" >
          <Box
            justify="center"
            align="center"
          >
            <Image src={rooms} alt="Rooms" htmlWidth="357" htmlHeight="167" borderRadius="5%" />
            <Heading as="h3">Комнаты</Heading>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default MainMenu;
