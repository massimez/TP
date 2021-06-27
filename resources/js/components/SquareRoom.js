import Icon from "@chakra-ui/icon";
import { Box, Flex, Text, HStack, SimpleGrid } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { MdSettings, MdAccessibility } from "react-icons/md";
import RoomNext from "./RoomNext";
import SquareFree from "./SquareFree";
import SquareFreeBottom from "./SquareFreeBottom";
import man from "../svg/man.svg";
import women from "../svg/women.svg";
import oven from "../svg/oven.svg";
import stais from "../svg/stais.svg";
import kobuvaya from "../svg/kobuvaya.png";


import { useDisclosure } from "@chakra-ui/react";
import RoomProfil from "./RoomProfil";
import axios from "axios";
import SquareIcon from "./SquareIcon";

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
            <RoomNext  rooms={props.rooms} showList={true} setFloorPage={setFloorPage} floorActive={floorPage} />
            <SimpleGrid my={2} border="5px solid rgba(0, 90, 174, 1)" columns={1} spacingX="0" spacingY="0" width="95%" overflowX="auto" mx="auto"  >
                <Flex
                    alignItems="center"
                    justify="center"
                    direction="row"
                    p={0}
                    m={0}
                    mb="43px"
                >
                    <SquareIcon width={props.width}  icon={kobuvaya} left="true" />
                    {props.rooms
                        .filter((opt) => opt.floor === floorPage)
                        .slice(0, 15)
                        .map((room, index) => (
                            <>
                            {index === 4 ? <SquareIcon  width={props.width} icon={oven} left="true" /> : null}
                            {index === 8 ? <SquareIcon  width={props.width} icon={oven} left="true" /> : null}
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
                                width={props.width}
                                    bg={
                                        room.number_of_living < room.max_living
                                            ? "rgba(178, 223, 181, 1)"
                                            : "white"
                                    }
                                    room={room}
                                />
                            </Box>
                            </>
                        ))}
                        <SquareIcon width={props.width}  icon={kobuvaya} left="true" />
                </Flex>
                {/* <Flex
                    border="5px solid rgba(0, 90, 174, 0.7)"
                    alignItems="center"
                    justify="center"
                    direction="row"
                    height="38px"
                ></Flex> */}
                <Flex
                    alignItems="center"
                    justify="center"
                    direction="row"
                >
                    <SquareIcon width={props.width} icon={women} />

                    {props.rooms
                        .filter((opt) => opt.floor === floorPage)
                        .slice(15, 30)
                        .map((room, index) => (
                            <>
                            {index === 4 ? <SquareIcon  width={props.width} icon={stais}  /> : null}
                            {index === 8 ? <SquareIcon  width={props.width} icon={stais}  /> : null}
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

                                <SquareFreeBottom
                                width={props.width}
                                    bg={
                                        room.number_of_living < room.max_living
                                            ? "rgba(178, 223, 181, 1)"
                                            : "white"
                                    }
                                    room={room}
                                />
                            </Box>
                            </>
                        ))}
                    <SquareIcon width={props.width} icon={man} />
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
