import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ImArrowRight2 } from "react-icons/im";
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
    AdaptedRadioGroup,
    Tooltip,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
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
const FreeRoomsDialog = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [freeRooms, setFreeRooms] = useState([]);
    const [selectedToView, setSelectedToView] = useState("");
    const [selectedToViewID, setSelectedToViewID] = useState("");
    const [floorPage, setFloorPage] = useState(1);
    useEffect(() => {
        const fetchRooms = async () => {
            const res = await axios.get("/api/room");
            setFreeRooms(res.data.rooms);
            console.log(freeRooms);
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
                <Tooltip label="Просмотр соседей" fontSize="md">
                    <ViewIcon
                        w={6}
                        h={6}
                        onClick={() => {
                            onOpen();
                        }}
                    />
                </Tooltip>
                <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Комната №{props.id}
                            <Text
                                fontSize="14px"
                                fontWeight="500"
                                color="#A1A1A1"
                            >
                                В данной комнате проживают следующие студенты
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Table
                                variant="striped"
                                colorScheme="teal"
                                border="1px  solid"
                            >
                                <Thead
                                    bg="blue.300"
                                    border="1px  solid"
                                    borderColor="blue.300"
                                    borderRadius="md"
                                >
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
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                mx="auto"
                                height="45px"
                                width="20%"
                                colorScheme="facebook"
                                color="white"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Ok
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };

    return (
        <>
            <Button rightIcon={<ImArrowRight2 />}
                    _focus={{
                        bg: "teal.600",
                        color: "white",
                        borderColor: "teal.600",
                        boxShadow: "outline",
                    }}
                    width="180px"
                    colorScheme="facebook"
                    mt={4}
                    mb={1}
                    ml="auto"
                    pl={3}
                    pr={3}
                    onClick={oonClick}>
                            Показать списком
                </Button>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Комнаты{" "}
                        <Text fontSize="14px" fontWeight="500" color="#A1A1A1">
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Table variant="simple">
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
                                {freeRooms.filter(
                                        (opt) =>
                                            opt.floor === props.floorActive)
                                    .map((room, index) => (
                                        <Tr key={room.room_id}>
                                            <Th>
                                                    {room.room_id}
                                            </Th>
                                            <Th>
                                                {room.number_of_living} /{" "}
                                                {room.max_living}
                                            </Th>
                                            <Th>{room.status}</Th>
                                            <Th
                                                _hover={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setSelectedToViewID(
                                                        room.room_id
                                                    );
                                                }}
                                            >
                                                <CustomDrawer
                                                    roomIndex={index}
                                                    id={room.room_id}
                                                />
                                            </Th>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>

                            <Button
                                colorScheme={
                                    props.SelectedRoom ? "facebook" : "teal"
                                }
                                width="75%"
                                height="50px"
                                mx="auto"
                                onClick={onClose}
                                type="submit"
                            >
                                Ok
                            </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FreeRoomsDialog;
