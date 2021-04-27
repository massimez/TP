import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { MdSettings, MdAccessibility } from "react-icons/md";
import RoomNext from "./RoomNext";
import SquareFree from "./SquareFree";

import { useDisclosure } from "@chakra-ui/react";

const SquareRoom = (rooms) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [floorPage, setFloorPage] = useState(1);

    const handleclickroom = () => {
        console.log("worked")
    }

    return (
        <>
        <RoomNext rooms={rooms} setFloorPage={setFloorPage} />
        <Box p={2}>
            <Flex alignItems="center" justify="center" direction="row"  border="2px" >
                <SquareFree ass={MdAccessibility} />
                {rooms.rooms
                    .filter((opt) => opt.floor === floorPage)
                    .slice(0, 25)
                    .map((room) => (
                        <>
                            <Flex
                                width="40px"
                                height="80px"
                                border="2px"
                                key={room.room_id}
                                bg={room.room_id < 500 ? "blue" : "green"}
                                alignContent="space-between"
                                direction="column"
                                onClick={ () => {handleclickroom (room.room_id)

                                } }
                            >
                                <Box align="center">
                                    <Icon align="center" as={MdSettings} />
                                </Box>
                                <Text align="center" justifySelf="end">
                                    {room.room_id}
                                </Text>
                                <Text align="center" justifySelf="end">
                                    {room.number_of_living}/4
                                </Text>
                            </Flex>
                        </>
                    ))}
                    <SquareFree icon="MdAccessibility" ass={MdAccessibility} />

            </Flex>
            <Flex
                border="2px"
                alignItems="center"
                justify="center"
                direction="row"
                height="30px"
            >
            </Flex>
            <Flex alignItems="center" justify="center" direction="row" border="2px">
            <SquareFree ass={MdAccessibility} />
                {rooms.rooms
                    .filter((opt) => opt.floor === floorPage)
                    .slice(0, 25)
                    .map((room) => (
                        <>
                            <Flex
                                width="40px"
                                height="80px"
                                border="2px"
                                key={room.room_id}
                                bg={room.room_id < 500 ? "blue" : "green"}
                                alignContent="space-between"
                                direction="column"
                            >
                                <Box align="center">
                                    <Icon as={MdSettings} />
                                </Box>
                                <Text align="center" justifySelf="end">
                                    {room.room_id}
                                </Text>
                                <Text align="center" justifySelf="end">
                                    {room.number_of_living}/4
                                </Text>
                            </Flex>
                        </>
                    ))}
                    <SquareFree ass={MdAccessibility} />
            </Flex>
            </Box>
            </>
    );
};

export default SquareRoom;
