import React, { useState, useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Stack,
    Button,
    ButtonGroup,
    FormControl,
    IconButton,
    FormLabel,
    Input,
    Select,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";

import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import SuccesMessage from "../../components/SuccesMessage";
import PageLoader from "../../components/PageLoader";
import { useDisclosure } from "@chakra-ui/react";

export const RoomsTable = ({ rooms, loading, setChange }, props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [Error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [roomFocus, setroomFocus] = useState("");
    const [roomID, setRoomID] = useState("");
    const [floor, setfloor] = useState("");
    const [status, setStatus] = useState("Мужская");
    const [numberLivingMax, setnumberLivingMax] = useState("");
    const [roomss, setrooms] = useState([]);
    const [addRoom, setAddRoom] = useState(false);

    if (loading) {
        return <PageLoader />;
    }
    const handleDelete = async (id) => {
        await axios
            .delete(`/api/room/${id}`)
            .then((res) => {
                setSucces(res.data.message);
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    function handleUpdate() {
        //
        const data = {
            room_id: roomID,
            floor: floor,
            max_living: numberLivingMax,
            status: status,
            number_living: "0",
        };

        axios
            .put(`/api/room/${roomFocus}`, data)
            .then((res) => {
                setChange(data);
                setSucces(res.data.message);
                onClose();
            })
            .catch((err) => {
                setError("Произошла ошибка, пожалуйста, проверьте данные еще раз");
                console.log(err.response.data.errors);
            });
    }
    const AddRoomHandler = () => {
        //
        const data = {
            room_id: roomID,
            floor: floor,
            status: status,
            max_living: numberLivingMax,
            number_of_living: "0",
        };

        axios
            .post(`/api/room`, data)
            .then((res) => {
                setChange(data);
                setSucces("Успешно" + res.data.message);
                onClose();
            })
            .catch((err) => {
                setError("Произошла ошибка, пожалуйста, проверьте данные еще раз");
                console.log(err.response.data.errors);
            });
        setAddRoom(true);
    };
    return (
        <>
            {" "}
            <Button
                colorScheme="teal"
                onClick={() => {
                    setAddRoom(true);
                    setRoomID("");
                    setStatus("");
                    setfloor("");
                    setnumberLivingMax("");
                    onOpen();
                }}
            >
                Добавить комнату
            </Button>
            {Error && <ErrorMessage message={Error} />}
            {succes && <SuccesMessage message={succes} />}
            <Table variant="striped" mt={2}>
                <Thead bg="blue.300" color="white">
                    <Tr>
                        <Th color="white">Номер комнаты</Th>
                        <Th color="white">Cтуденты</Th>
                        <Th color="white">Этаж</Th>
                        <Th color="white"></Th>
                    </Tr>
                </Thead>
                <Tbody color="black" bg="white">
                    {rooms.map((room, index) => (
                        <Tr key={room.room_id}>
                            <Th>{room.room_id} </Th>
                            <Th>
                                {room.number_of_living}/{room.max_living}
                            </Th>
                            <Th>{room.floor}</Th>
                            <Th>
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        handleDelete(room.room_id);
                                    }}
                                >Удалить</Button>
                                <Button
                                    onClick={() => {
                                        onOpen();
                                        setRoomID(room.room_id);
                                        setfloor(room.floor);
                                        setnumberLivingMax(room.max_living);
                                        setStatus(room.status);
                                        setroomFocus(room.room_id);
                                    }}
                                >
                                    Редактировать
                                </Button>
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Информация </DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        {Error && <ErrorMessage message={Error} />}
                        {succes && <SuccesMessage message={succes} />}
                        <FormControl>
                            <FormLabel>Номер комнаты</FormLabel>
                            <Input
                                type="text"
                                placeholder={roomID}
                                value={roomID}
                                size="lg"
                                onChange={(event) =>
                                    setRoomID(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup onChange={setStatus} value={status}>
                                <Stack direction="row">
                                    <Radio value="Мужская">Мужская</Radio>
                                    <Radio value="Женская">Женская</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Этаж</FormLabel>
                            <Input
                                type="text"
                                value={floor}
                                size="lg"
                                onChange={(event) =>
                                    setfloor(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Макс в комнате</FormLabel>
                            <Input
                                type="text"
                                value={numberLivingMax}
                                size="lg"
                                onChange={(event) =>
                                    setnumberLivingMax(
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </FormControl>
                    </DrawerBody>

                    <ModalFooter>
                        {!addRoom ? (
                            <Button
                                onClick={handleUpdate}
                                colorScheme="blue"
                                mr={3}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                onClick={AddRoomHandler}
                                colorScheme="blue"
                                mr={3}
                            >
                                Сохранить
                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                setRoomID("");
                                setStatus("");
                                setfloor("");
                                setnumberLivingMax("");
                                setAddRoom(false);
                                onClose();
                            }}
                        >
                            Отменить
                        </Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
