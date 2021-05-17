import Icon from "@chakra-ui/icon";
import { Box, Flex, Text, HStack, SimpleGrid } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { MdSettings, MdAccessibility } from "react-icons/md";
import RoomNext from "./RoomNext";
import SquareFree from "./SquareFree";

import { useDisclosure } from "@chakra-ui/react";
import RoomProfil from "./RoomProfil";
import axios from "axios";
const SquareRoom = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rooms, setRooms] = useState();
    const [floorPage, setFloorPage] = useState(1);
    const [roomMax, setRoomMax] = useState();
    const [roomNow, setRoomNow] = useState();
    const [roomFocus, setRoomFocus] = useState("");

    const handleclickroom = (id) => {
        setRoomFocus(id.toString());
        onOpen();
    };

    useEffect(() => {
        const fetchroom = async () => {
            await axios
                .get(`/api/room/${roomFocus}`)
                .then((ress) => {
                    setRooms(ress.data.students);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchroom();
    }, [roomFocus]);

    return (
        <>
            <RoomNext rooms={props.rooms} setFloorPage={setFloorPage} />
            <SimpleGrid my={2} border="5px solid rgba(0, 90, 174, 1)" columns={1} spacingX="0" spacingY="0"  mx="auto" w="80%" >
                <Flex
                    alignItems="center"
                    justify="center"
                    direction="row"
                    p={0}
                    m={0}
                >
                    <SquareFree ass={MdAccessibility} />
                    {props.rooms
                        .filter((opt) => opt.floor === floorPage)
                        .slice(0, 200)
                        .map((room, index) => (
                            <Box
                                p={0}
                                m={0}
                                _hover={{ cursor: "pointer" }}
                                onClick={() => {
                                    setRoomNow( room.max_living);
                                    setRoomMax(room.number_of_living);
                                    handleclickroom(room.room_id)
                                }}
                            >
                                <SquareFree
                                    bg={
                                        room.number_of_living < room.max_living
                                            ? "rgba(178, 223, 181, 1)"
                                            : "white"
                                    }
                                    key={index}
                                    room={room}
                                />
                            </Box>
                        ))}
                    <SquareFree icon="MdAccessibility" ass={MdAccessibility} />
                </Flex>
                <Flex
                    border="5px solid rgba(0, 90, 174, 0.7)"
                    alignItems="center"
                    justify="center"
                    direction="row"
                    height="38px"
                ></Flex>
                <Flex
                    alignItems="center"
                    justify="center"
                    direction="row"
                >
                    <SquareFree ass={MdAccessibility} />
                    {props.rooms
                        .filter((opt) => opt.floor === floorPage)
                        .slice(100, 200)
                        .map((room,i) => (
                            <>
                                <SquareFree
                                    bg={
                                        room.number_of_living < room.max_living
                                            ? "rgba(178, 223, 181, 1)"
                                            : "white"
                                    }
                                    key={i}
                                    room={room}
                                    onClick={() =>  {
                                        setRoomNow( room.max_living);
                                        console.log(room.max_living)
                                        setRoomMax(room.number_of_living);
                                        handleclickroom(room.room_id);
                                    }
                                    }
                                />
                            </>
                        ))}
                    <SquareFree ass={MdAccessibility} />
                </Flex>
            </SimpleGrid>
            {roomFocus && (
                <RoomProfil
                    rooms={rooms}
                    roomFocus={roomFocus}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    roomMax={roomMax}
                    roomNow={roomNow}
                />
            )}
        </>
    );
};

export default SquareRoom;
