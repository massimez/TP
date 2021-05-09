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
} from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";

import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
import PageLoader from "./PageLoader"
import { useDisclosure } from "@chakra-ui/react";

export const UsersTable = ({ users, loading ,setChange},props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [Error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [userFocus, setUserFocus] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patname, setPatname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [position, setPosition] = useState("");
    const [userss, setUsers] = useState([]);

    if (loading) {
        return <PageLoader />;
    }
    const handle = (event) => {
        let arg1 = event.target.getAttribute("key");
        console.log("Work" + arg1);
    };
    const handleDelete = async (id) => {
        await axios
            .delete(`/api/admin/${id}`)
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
            name: name,
            surname: surname,
            patronymic: patname,
            email: email,
            role: role,
            position: position,
        };

        axios
            .put(`/api/admin/${userFocus}`, data)
            .then((res) => {
                setChange(data);
                setSucces(res.data.message);
                onClose();
            })
            .catch((err) => {
                setError("Invalid");
                console.log(err.response.data.errors);
            });
    }
    return (
        <>
            {Error && <ErrorMessage message={Error} />}
            {succes && <SuccesMessage message={succes} />}
            <Table variant="striped">
                <Thead bg="blue.300" color="white">
                    <Tr>
                        <Th color="white">ID</Th>
                        <Th color="white">ФИО</Th>
                        <Th color="white">Email</Th>
                        <Th color="white">должность</Th>
                        <Th color="white">Роль</Th>
                        <Th color="white"></Th>
                    </Tr>
                </Thead>
                <Tbody color="black" bg="white">
                    {users.map((user, index) => (
                        <Tr key={user.id} onClick={handle}>
                            <Th>{user.id} </Th>
                            <Th>
                                {user.name} {user.surname} {user.patronymic}
                            </Th>
                            <Th>{user.email}</Th>
                            <Th>{user.position}</Th>
                            <Th>{user.role}</Th>
                            <Th>
                                <DeleteIcon
                                    _hover={{ cursor: "pointer" }}
                                    w={6}
                                    h={6}
                                    onClick={() => {
                                        handleDelete(user.id);
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        onOpen();
                                        setName(user.name);
                                        setSurname(user.surname);
                                        setPatname(user.patronymic);
                                        setEmail(user.email);
                                        setRole(user.role);
                                        setPosition(user.position);
                                        setUserFocus(user.id);
                                    }}
                                >
                                    Edit
                                </Button>
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Update User Informations</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <FormControl>
                            <FormLabel>Имя</FormLabel>
                            <Input
                                type="text"
                                placeholder={name}
                                value={name}
                                size="lg"
                                onChange={(event) =>
                                    setName(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Фамилия</FormLabel>
                            <Input
                                type="text"
                                value={surname}
                                size="lg"
                                onChange={(event) =>
                                    setSurname(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Отчество</FormLabel>
                            <Input
                                type="text"
                                value={patname}
                                size="lg"
                                onChange={(event) =>
                                    setPatname(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                size="lg"
                                onChange={(event) =>
                                    setEmail(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Роль</FormLabel>
                            <Input
                                type="text"
                                value={role}
                                size="lg"
                                onChange={(event) =>
                                    setRole(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Должность</FormLabel>
                            <Input
                                type="text"
                                value={position}
                                size="lg"
                                onChange={(event) =>
                                    setPosition(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                    </DrawerBody>

                    <ModalFooter>
                        <Button
                            onClick={handleUpdate}
                            colorScheme="blue"
                            mr={3}
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
