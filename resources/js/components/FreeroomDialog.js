import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Inputcontrol,
    Select,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    RadioGroup,
    Stack,
    VStack,
    ModalCloseButton,
    Radio,
    AdaptedRadioGroup,Tooltip,Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";
import RoomNext from "./RoomNext";
const FreeroomDialog = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [freeRooms, setFreeRooms] = useState([]);
    let maxliving = 4;
    const [floorPage, setFloorPage] = useState(1);
    useEffect(() => {
        const fetchRooms = async () => {
            const res = await axios.get("/api/room");
            setFreeRooms(res.data.rooms);
            console.log(freeRooms)
        };
        fetchRooms();
    }, []);

    function oonClick(event) {
        event.preventDefault();
        onOpen();
    }
    function cancelClose(event) {
        event.preventDefault();
        onClose();
        props.setSelectedRoom("");
    }
    function submitClose() {
        console.log("yaw test");
        props.formik();
        onClose();
    }

    return (
        <>
            <Button
                type="button"
                color="whiteAlpha.900"
                width="450px"
                height="60px"
                bg="bluet.900"
                onClick={oonClick}
            >
                Добавить и выбрать комнату
            </Button>

            <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Доступные комнаты</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <Table variant="simple">
                            <TableCaption>{props.sex}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>N°комнаты</Th>
                                    <Th>Проживает</Th>
                                    <Th>ПОЛ</Th>
                                    <Th>Соседи</Th>

                                    <Th></Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {freeRooms
                                    .slice(0, 20)
                                    .filter(
                                        (opt) =>
                                            opt.number_of_living < maxliving &&
                                            opt.floor === floorPage
                                    )
                                    .map((room) => (
                                        <Tr key={room.room_id}>
                                            <Th>
                                                <Radio
                                                    key={room.room_id}
                                                    onClick={() => {
                                                        props.setSelectedRoom(
                                                            room.room_id
                                                        );
                                                        console.log(
                                                            room.room_id
                                                        );
                                                    }}
                                                    _checked={{}}
                                                    _focus={{
                                                        bg: "teal.600",
                                                        color: "white",
                                                        borderColor: "teal.600",
                                                        boxShadow: "outline",
                                                    }}
                                                >
                                                    {room.room_id}
                                                </Radio>
                                            </Th>
                                            <Th>
                                                {room.number_of_living} /{" "}
                                                {maxliving}
                                            </Th>
                                            <Th>{room.status}</Th>
                                            <th>
                                                <Tooltip
                                                    label="Просмотр соседей"
                                                    fontSize="md"
                                                >
                                                     <ViewIcon />
                                                </Tooltip>
                                            </th>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </DrawerBody>
                    <RoomNext
                        rooms={freeRooms}
                        size={"sm"}
                        setFloorPage={setFloorPage}
                    />
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={submitClose}
                            type="submit"
                        >
                            Ok
                        </Button>
                        <Button onClick={cancelClose}>Отменить</Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default FreeroomDialog;
