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

export const GroupsTable = ({ groups, loading, setChange }, props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [Error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [groupFocus, setgroupFocus] = useState("");
    const [groupName, setGroupName] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const [formEducation, setFormEducation] = useState("Очная");
    const [yearStudy, setYearStudy] = useState("");
    const [groupss, setgroups] = useState([]);
    const [addgroup, setAddgroup] = useState(false);

    if (loading) {
        return <PageLoader />;
    }
    const handle = (event) => {
        let arg1 = event.target.getAttribute("key");
        console.log("Work" + arg1);
    };
    const handleDelete = async (id) => {
        await axios
            .delete(`/api/group/${id}`)
            .then((res) => {
                setSucces(res.data.message);
            })
            .catch((err) => {
                setError(err.message + " ");
            });
        setChange("");
    };
    function handleUpdate() {
        //
        const data = {
            group_name: parseInt(groupName),
            faculty: facultyName,
            course_of_study: yearStudy,
            form_of_education: formEducation,
        };

        axios
            .put(`/api/group/${groupFocus}`, data)
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
    const AddgroupHandler = () => {
        //
        const data = {
            group_name: groupName,
            faculty: facultyName,
            course_of_study: yearStudy,
            form_of_education: formEducation,
        };

        axios
            .post("/api/group", data)
            .then((res) => {
                setChange(data);
                setSucces(res.data.message);
                onClose();
                setAddgroup(false);
            })
            .catch((err) => {
                setError("Произошла ошибка, пожалуйста, проверьте данные еще раз");
                console.log(err.response.data.errors);
            });
    };
    return (
        <>
            {" "}
            <Button
                onClick={() => {
                    setAddgroup(true);
                    onOpen();
                }}
            >
                Добавить группу
            </Button>
            {Error && <ErrorMessage message={Error} />}
            {succes && <SuccesMessage message={succes} />}
            <Table variant="striped" mt={2}>
                <Thead bg="blue.300" color="white">
                    <Tr>
                        <Th color="white">Группа</Th>
                        <Th color="white">Факультет</Th>
                        <Th color="white">Курс</Th>
                        <Th color="white">Форма обучения</Th>
                        <Th color="white"></Th>
                    </Tr>
                </Thead>
                <Tbody color="black" bg="white">
                    {groups.map((group, index) => (
                        <Tr key={index} onClick={handle}>
                            <Th>{group.group_name} </Th>
                            <Th>{group.faculty}</Th>
                            <Th>{group.course_of_study}</Th>
                            <Th>{group.form_of_education}</Th>
                            <Th>
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        handleDelete(group.id);
                                    }}
                                >Удалить</Button>
                                <Button
                                    onClick={() => {
                                        onOpen();
                                        setGroupName(group.group_name);
                                        setFacultyName(group.faculty);
                                        setYearStudy(group.course_of_study);
                                        setFormEducation(
                                            group.form_of_education
                                        );
                                        setgroupFocus(group.id);
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
                    <DrawerHeader>Группа {groupName}</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        {Error && <ErrorMessage message={Error} />}
                        {succes && <SuccesMessage message={succes} />}
                        <FormControl>
                            <FormLabel>Имя группа</FormLabel>
                            <Input
                                type="text"
                                placeholder={groupName}
                                value={groupName}
                                size="lg"
                                onChange={(event) =>
                                    setGroupName(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Факультет</FormLabel>
                            <Input
                                type="text"
                                value={facultyName}
                                size="lg"
                                onChange={(event) =>
                                    setFacultyName(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Курсь</FormLabel>
                            <Input
                                type="text"
                                value={yearStudy}
                                size="lg"
                                onChange={(event) =>
                                    setYearStudy(event.currentTarget.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Форма обучения</FormLabel>
                            <RadioGroup
                                onChange={setFormEducation}
                                value={formEducation}
                            >
                                <Stack direction="row">
                                    <Radio value="Очная">Очная</Radio>
                                    <Radio value="Очно-заочная">
                                        Очно-заочная
                                    </Radio>
                                    <Radio value="Заочная">Заочная</Radio>
                                </Stack>
                                <Radio value="Дистанционное обучение">
                                        Дистанционное обучение
                                    </Radio>
                            </RadioGroup>
                        </FormControl>
                    </DrawerBody>

                    <ModalFooter>
                        {addgroup ? (
                            <Button
                                onClick={AddgroupHandler}
                                colorScheme="blue"
                                mr={3}
                            >
                                Сохранить
                            </Button>
                        ) : (
                            <Button
                                onClick={handleUpdate}
                                colorScheme="blue"
                                mr={3}
                            >
                                Обновлять
                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                setGroupName("");
                                setFacultyName("");
                                setYearStudy("");
                                setFormEducation("");
                                setgroupFocus("");
                                setAddgroup(false);
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
