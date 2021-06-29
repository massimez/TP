import React, { useState, useEffect } from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    Button,
    Wrap,
    useToast,
    Box,
} from "@chakra-ui/react";
import axios from "axios";
import FreeroomDialog from "./FreeroomDialog";
import AlertDel from "./AlertDel";

const ResidentProfile = (props) => {
    const resident = props.residentFocus;
    const [name, setName] = useState(resident.name);
    const [surname, setSurname] = useState(resident.surname);
    const [patname, setPatname] = useState(resident.patronymic);
    const [birthday, setBirthday] = useState(resident.birthday);
    const [sex, setSex] = useState(resident.sex);
    const [phone, setPhone] = useState(resident.phone_number);
    const [email, setEmail] = useState(resident.email);
    const [room, setRoom] = useState(resident.room_id);
    const [passportNumber, setPassportNumber] = useState(
        resident.number_passport
    );
    const [infoPassport, setInfoPassport] = useState(resident.info_passport);
    const [registration, setRegistration] = useState(resident.registration);
    const [citizenship, setCitizenship] = useState(resident.citizenship);
    const [birthPlace, setBirthPlace] = useState(resident.place_of_birth);

    const [statusStudent, setStatusStudent] = useState(resident.status_student);
    const [statusAccommodation, setAccommodation] = useState(
        resident.status_accommodation
    );
    const [group, setGroup] = useState(resident.group);
    const toast = useToast();
    const [editmode, setEditMode] = useState(true);
    const [groups, Setgroups] = useState([]);
    const [statusStudents, setStatusStudents] = useState([]);

    useEffect(() => {
        const fetchGroup = async () => {
            await axios
                .get("/api/group")
                .then((ress) => {
                    Setgroups(ress.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const fetchStatus = async () => {
            await axios
                .get("/api/status")
                .then((ress) => {
                    setStatusStudents(ress.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchStatus();
        fetchGroup();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //
        const data = {
            name: name,
            email: email,
            birthday: birthday,
            citizenship: citizenship,
            email: email,
            group: group,
            info_passport: infoPassport,
            name: name,
            number_passport: passportNumber,
            patronymic: patname,
            phone_number: phone,
            place_of_birth: birthPlace,
            registration: registration,
            room_id: room,
            sex: sex,
            status_student: statusStudent,
            status_accommodation: statusAccommodation,
            surname: surname,
        };
        setTimeout(() => {
            axios
                .put(`/api/student/${resident.student_id}`, data)
                .then((res) => {
                    props.setRerenderChange(res);
                    toast({
                        title: `Успешно `,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    props.setEditMode(!editmode);
                    props.onClose();
                })
                .catch((err) => {
                    toast({
                        title: `Произошла ошибка, пожалуйста, проверьте данные еще раз`,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                    console.log(err.response.data.errors);
                });
        }, 1000);
    };
    const handleVesli = (event) => {
        event.preventDefault();
        const data = {
            room_id: room,
            status_accommodation: "Выселен",
        };
        setTimeout(() => {
            axios
                .put(`/api/student/${resident.student_id}`, data)
                .then((res) => {
                    props.setRerenderChange(res);
                    toast({
                        title: `Успешно `,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    props.setEditMode(!editmode);
                    props.onClose();
                })
                .catch((err) => {
                    toast({
                        title: `Произошла ошибка, пожалуйста, проверьте данные еще раз`,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                    console.log(err.response.data.errors);
                });
        }, 1000);
    };
    const divStyle = {
        borderRadius: "40px",
    };
    return (
        <Box
            borderRadius="sm"
            border="1px solid black"
            style={{ borderRadius: "1em", borderColor: "#A1A1A1" }}
        >
            <Tabs variant="enclosed" colorScheme="blue" orientation="vertical">
                <TabList
                    borderRight="1px"
                    borderBottom="1px"
                    style={{ borderColor: "#A1A1A1" }}
                    width={["100px", "200px", "300px"]}
                >
                    <Tab
                        borderBottom="1px"
                        style={{ borderColor: "#A1A1A1" }}
                        _selected={{ bg: "rgba(0,90,174,0.3)" }}
                    >
                        Общая информация
                    </Tab>
                    <Tab
                        borderBottom="1px"
                        style={{ borderColor: "#A1A1A1" }}
                        _selected={{ bg: "rgba(0,90,174,0.3)" }}
                    >
                        Паспортные данные
                    </Tab>
                    <Tab
                        borderBottom="1px"
                        style={{ borderColor: "#A1A1A1" }}
                        _selected={{ bg: "rgba(0,90,174,0.3)" }}
                    >
                        Данные студента
                    </Tab>
                    {props.vesilit ? (
                        <Box width="35%" mt="auto" mb="15px">
                            <AlertDel
                                css={{ float: "right" }}
                                handleVesli={handleVesli}
                                btnmsg={"Выселить"}
                                msg={"Подтвердить ?"}
                            />
                        </Box>
                    ) : null}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl>
                            <HStack>
                                <Box verticalAlign="middle" width="151px" height="41px">
                                    <p>Фамилия:</p>
                                </Box>
                                <Input
                                    type="text"
                                    value={surname}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setSurname(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                   <p>Имя:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={name}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setName(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                   <p>Отчество:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={patname}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setPatname(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>Дата рождения:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={birthday}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setBirthday(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <HStack>
                            <Box width="151px" height="41px">
                                <p>Пол:</p>
                            </Box>{" "}
                            <Select
                                placeholder={sex}
                                value={sex}
                                width="147px"
                                height="47px"
                                onChange={(event) =>
                                    setSex(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                                border={editmode ? "none" : "1px"}
                            >
                                <option
                                    style={{ color: "blue" }}
                                    value="МУЖСКОЙ"
                                >
                                    МУЖСКОЙ
                                </option>
                                <option
                                    style={{ color: "red" }}
                                    value="ЖЕНСКИЙ"
                                >
                                    ЖЕНСКИЙ
                                </option>
                            </Select>
                        </HStack>

                        <FormControl mt={1}>
                            <HStack>
                            <Box width="151px" height="41px">
                                <p>Номер телефона:</p>
                                </Box>
                                <Input
                                    type="tel"
                                    value={phone}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setPhone(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                   <p>E-mail:</p>
                                </Box>{" "}
                                <Input
                                    type="email"
                                    value={email}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setEmail(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                   <p> № комнаты:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={room}
                                    width="100px"
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setRoom(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                                {!editmode ? (
                                    <FreeroomDialog
                                        setSelectedRoom={setRoom}
                                        SelectedRoom={room}
                                        sex={sex}
                                        size={"sm"}
                                        w={"200px"}
                                        h={"40px"}
                                        name={"Выбрать комнату"}
                                    />
                                ) : null}
                            </HStack>
                        </FormControl>
                        <HStack justify="space-between">
                            {editmode && (
                                <Button
                                    colorScheme="blue"
                                    mr="auto"
                                    onClick={() =>
                                        props.handleDownl(
                                            residentFocus.student_id
                                        )
                                    }
                                >
                                    Скачать договор
                                </Button>
                            )}
                            {editmode ? (
                                <Button
                                    onClick={() => {
                                        setEditMode(!editmode);
                                    }}
                                >
                                    {editmode
                                        ? "Редактировать данные"
                                        : "Отменить "}
                                </Button>
                            ) : null}
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>
                                        Серия и номер паспорта:
                                    </p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={passportNumber}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setPassportNumber(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />{" "}
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>
                                        Кем выдан:
                                    </p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={infoPassport}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setInfoPassport(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>Прописка:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={registration}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setRegistration(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />{" "}
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>Гражданство:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={citizenship}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setCitizenship(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <p>Место рождения:</p>
                                </Box>{" "}
                                <Input
                                    type="text"
                                    value={birthPlace}
                                    width="147px"
                                    height="47px"
                                    onChange={(event) =>
                                        setBirthPlace(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />{" "}
                            </HStack>
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        {/* Third part panel */}

                        <FormControl mt={1}>
                            <HStack>
                                <Box width="151px" height="41px">
                                    <FormLabel>Группа:</FormLabel>
                                </Box>{" "}
                                <Select
                                    value={group}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                    onChange={(event) =>
                                        setGroup(event.currentTarget.value)
                                    }
                                >
                                    <option value={group} disabled selected>
                                        {group}
                                    </option>
                                    {groups.map((groupp) => (
                                        <option
                                            style={{ color: "black" }}
                                            key={groupp.id}
                                            value={groupp.group_name}
                                        >
                                            {groupp.group_name}
                                        </option>
                                    ))}
                                </Select>
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            {" "}
                            <HStack>
                                <Box width="151px" height="41px">
                                    <FormLabel>Статус студента:</FormLabel>
                                </Box>{" "}
                                <Select
                                    value={statusStudent}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                    onChange={(event) =>
                                        setStatusStudent(
                                            event.currentTarget.value
                                        )
                                    }
                                >
                                    <option
                                        value={statusStudent}
                                        disabled
                                        selected
                                    >
                                        {statusStudent}
                                    </option>
                                    {statusStudents.map((st, index) => (
                                        <option
                                            key={index}
                                            value={st.status_student}
                                        >
                                            {st.status_student}
                                        </option>
                                    ))}
                                </Select>
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            {" "}
                            <HStack>
                                <Box width="151px" height="41px">
                                    <FormLabel>Статус проживания:</FormLabel>
                                </Box>{" "}
                                <Select
                                    value={statusAccommodation}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                    onChange={(event) =>
                                        setAccommodation(
                                            event.currentTarget.value
                                        )
                                    }
                                >
                                    <option
                                        value={statusAccommodation}
                                        disabled
                                        selected
                                    >
                                        {statusAccommodation}
                                    </option>
                                    <option
                                        style={{ color: "blue" }}
                                        value="Проживает"
                                    >
                                        Проживает
                                    </option>
                                    <option
                                        style={{ color: "orange" }}
                                        value="Процесс оформления документов"
                                    >
                                        Процесс оформления документов
                                    </option>
                                    <option
                                        style={{ color: "red" }}
                                        value="Выселен"
                                    >
                                        Выселен
                                    </option>
                                </Select>
                            </HStack>
                        </FormControl>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {!editmode && (
                <>
                    <Button
                        css={{ float: "right" }}
                        onClick={handleSubmit}
                        bg="bluet.900"
                        color="white"
                        m={1}
                    >
                        Подтвердить и сохранить
                    </Button>
                </>
            )}
        </Box>
    );
};

export default ResidentProfile;
