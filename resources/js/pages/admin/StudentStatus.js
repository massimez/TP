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
    Select,Box
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
import Header from "../../components/layouts/Header";

const StudentStatus = () => {
    const [change, setChange] = useState();
    const [status, setStatus] = useState([]);
    const [statusName, setStatusName] = useState();
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [neighbors, setNeighbors] = useState()
    const [statusFocus, setstatusFocus] = useState()
    const [addStatus, setaddStatus] = useState(false)
    const { onOpen, onClose, isOpen } = useDisclosure();

    useEffect(() => {
        setLoading(true);
       axios
            .get("/api/status")
            .then((res) => {
                setStatus(res.data.data);
                setLoading(false);
            })
            .catch((err) => {}).finally(()=>{setLoading(false);});
    }, [change]);

    if (loading) {
        return <PageLoader />;
    }
    const handleDelete = async (id) => {
        await axios
            .delete(`/api/status/${id}`)
            .then((res) => {
                setSucces(res.data.message);
            })
            .catch((err) => {
                setError(err.message);
            });
            setChange("")
    };
    function handleUpdate() {
        //
        const data = {
            status_student: statusName,
            neighbors: neighbors,
        };

        axios
            .put(`/api/status/${statusFocus}`, data)
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
            status_student: statusName,
            neighbors: parseInt(neighbors),
        };

        axios
            .post(`/api/status`, data)
            .then((res) => {
                setChange(data);
                setSucces(res.data.message);
                onClose();
            })
            .catch((err) => {
                setError("Произошла ошибка, пожалуйста, проверьте данные еще раз");
                console.log(err.response.data.errors);
            });
    };
    return (
        <>
            <Header/>
            <Box mx={2}>
            <Button onClick={() => {
                setaddStatus(true);
                setStatusName("");
                setNeighbors("");
                onOpen();
            }}>Add new status</Button>
            {Error && <ErrorMessage message={Error} />}
            {succes && <SuccesMessage message={succes} />}
            <Table variant="striped" mt={2}>
                <Thead bg="blue.300" color="white">
                    <Tr>
                        <Th color="white">Название статуса</Th>
                        <Th color="white">Количество соседей</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody color="black" bg="white">
                    {status.map((stat, index) => (
                        <Tr key={stat.id} >
                            <Th>{stat.status_student} </Th>
                            <Th>{stat.neighbors}</Th>
                            <Th>
                                <DeleteIcon
                                    _hover={{ cursor: "pointer" }}
                                    w={6}
                                    h={6}
                                    onClick={() => {
                                        handleDelete(stat.id);
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        onOpen();
                                        setStatusName(stat.status_student);
                                        setNeighbors(stat.neighbors);
                                        setstatusFocus(stat.id)
                                    }}
                                >
                                    Edit
                                </Button>
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Update status Informations</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <FormControl>
                            <FormLabel>Название статуса </FormLabel>
                            <Input
                                type="text"
                                placeholder={statusName}
                                value={statusName}
                                size="lg"
                                onChange={(event) =>
                                    setStatusName(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Количество соседей</FormLabel>
                            <Input
                                type="number"
                                value={neighbors}
                                placeholder={neighbors}
                                size="lg"
                                onChange={(event) =>
                                    setNeighbors(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                    </DrawerBody>

                    <ModalFooter>
                        {addStatus ? (
                            <Button
                                onClick={AddRoomHandler}
                                colorScheme="blue"
                                mr={3}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                onClick={handleUpdate}
                                colorScheme="blue"
                                mr={3}
                            >
                                Edit
                            </Button>
                        )}

                        <Button onClick={() => {
                            setaddStatus(false);
                            onClose();}}>Cancel</Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default StudentStatus;
