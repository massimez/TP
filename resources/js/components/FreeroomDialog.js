import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
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
    AdaptedRadioGroup, Tooltip, Drawer,
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
    const [selectedToView, setSelectedToView] = useState('');
    const [selectedToViewID, setSelectedToViewID] = useState('');
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
        props.formik();
        onClose();
    }

    useEffect(() => {
        const fetchroom = async () => {
            await axios
                .get(`/api/room/${selectedToViewID}`)
                .then((ress) => {
                    setSelectedToView(ress.data.students);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchroom();
    }, [selectedToViewID]);

    const CustomDrawer = (props) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return (
            <>
                <Tooltip
                    label="Просмотр соседей"
                    fontSize="md"
                >
                    <ViewIcon w={6} h={6} onClick={() => {
                        onOpen()
                    }} />
                </Tooltip>
                <Drawer isOpen={isOpen} onClose={onClose} placement="top">
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>Комната №{props.id}</DrawerHeader>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <Table variant="striped" colorScheme="teal" border="1px  solid">
                                <Thead bg="blue.300" border="1px  solid" borderColor="blue.300" borderRadius="md" >
                                    <Tr>
                                        <Th>ФИО</Th>
                                        <Th>Факультет</Th>
                                        <Th>Курс</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {selectedToView &&
                                        selectedToView.map((rm, index) => (
                                            <Tr key={index}>
                                                <Th>
                                                    {rm.name} {rm.surname}
                                                </Th>
                                                <Th>{rm.faculty}</Th>
                                                <Th>{rm.course_of_study}</Th>
                                            </Tr>
                                        ))}
                                </Tbody>
                            </Table>
                        </DrawerBody>

                        <DrawerFooter>

                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        );
    };

    return (
        <>
            <Button
                type="button"
                color="whiteAlpha.900"
                width={props.w}
                height={props.h}
                size={props.size}
                bg="bluet.900"
                onClick={oonClick}

            >
                {props.name ? props.name : "Добавить и выбрать комнату"}
            </Button>

            <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Доступные комнаты</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <Table variant="simple">
                            <TableCaption>{props.sex ? props.sex : "Вы должны сначала выбрать пол"}</TableCaption>
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
                                            opt.number_of_living < opt.max_living &&
                                            opt.floor === floorPage &&
                                            (props.sex ? opt.status === (props.sex.toString().toLowerCase() === "женский" ? "Женская" : "Мужская") : opt.status === "2")
                                    )
                                    .map((room, index) => (
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
                                                {room.max_living}
                                            </Th>
                                            <Th>{room.status}</Th>
                                            <Th _hover={{ cursor: "pointer" }} onClick={() => { setSelectedToViewID(room.room_id) }}>

                                                <CustomDrawer roomIndex={index} id={room.room_id} />
                                            </Th>
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
                        {props.formik ? <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={submitClose}
                            type="submit"
                        >
                            Ok
                        </Button> : <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onClose}
                            type="submit"
                        >
                            Ok
                        </Button>}
                        <Button onClick={cancelClose}>Отменить</Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>

        </>
    );
};

export default FreeroomDialog;
