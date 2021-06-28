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
    const editmode = !props.editmode;
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

    return (
        <div>
            <Tabs variant="enclosed" colorScheme="blue" orientation="vertical">
                <TabList width="35%">
                    <Tab _selected={{ bg: "rgba(0,90,174,0.3)" }}>
                        Общая информация
                    </Tab>
                    <Tab _selected={{ bg: "rgba(0,90,174,0.3)" }}>
                        Паспортные данные
                    </Tab>
                    <Tab _selected={{ bg: "rgba(0,90,174,0.3)" }}>
                        Данные студента
                    </Tab>
                    <Box width="35%" mt="auto">
                        <AlertDel
                            css={{ float: "right" }}
                            handleVesli={handleVesli}
                            btnmsg={"Выселить"}
                            msg={"Подтвердить ?"}
                        />
                    </Box>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl>
                            <HStack>
                                <FormLabel>Фамилия:</FormLabel>
                                <Input
                                    type="text"
                                    value={surname}
                                    onChange={(event) =>
                                        setSurname(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Имя:</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    size="md"
                                    onChange={(event) =>
                                        setName(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Отчество:</FormLabel>
                                <Input
                                    type="text"
                                    value={patname}
                                    size="md"
                                    onChange={(event) =>
                                        setPatname(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Дата рождения:</FormLabel>
                                <Input
                                    type="text"
                                    value={birthday}
                                    size="md"
                                    onChange={(event) =>
                                        setBirthday(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <HStack>
                            <FormLabel>Пол:</FormLabel>
                            <Select
                                placeholder={sex}
                                value={sex}
                                size="md"
                                onChange={(event) =>
                                    setSex(event.currentTarget.value)
                                }
                                isDisabled={editmode}
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
                                <FormLabel>Номер телефона:</FormLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    size="md"
                                    onChange={(event) =>
                                        setPhone(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>E-mail:</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    size="md"
                                    onChange={(event) =>
                                        setEmail(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>№ комнаты:</FormLabel>
                                <Input
                                    type="text"
                                    value={room}
                                    width="100px"
                                    size="md"
                                    onChange={(event) =>
                                        setRoom(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
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
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <HStack>
                                <FormLabel>Серия и номер паспорта:</FormLabel>
                                <Input
                                    type="text"
                                    value={passportNumber}
                                    size="lg"
                                    onChange={(event) =>
                                        setPassportNumber(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                />{" "}
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Кем выдан и Дата выдачи:</FormLabel>
                                <Input
                                    type="text"
                                    value={infoPassport}
                                    size="lg"
                                    onChange={(event) =>
                                        setInfoPassport(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Прописка:</FormLabel>
                                <Input
                                    type="text"
                                    value={registration}
                                    size="lg"
                                    onChange={(event) =>
                                        setRegistration(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                />{" "}
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Гражданство:</FormLabel>
                                <Input
                                    type="text"
                                    value={citizenship}
                                    size="lg"
                                    onChange={(event) =>
                                        setCitizenship(
                                            event.currentTarget.value
                                        )
                                    }
                                    isDisabled={editmode}
                                />
                            </HStack>
                        </FormControl>

                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Место рождения:</FormLabel>
                                <Input
                                    type="text"
                                    value={birthPlace}
                                    size="lg"
                                    onChange={(event) =>
                                        setBirthPlace(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />{" "}
                            </HStack>
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        {/* Third part panel */}

                        <FormControl mt={1}>
                            <HStack>
                                <FormLabel>Группа:</FormLabel>

                                <Select
                                    value={group}
                                    size="lg"
                                    isDisabled={editmode}
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
                                <FormLabel>Статус студента:</FormLabel>

                                <Select
                                    value={statusStudent}
                                    size="lg"
                                    isDisabled={editmode}
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
                                <FormLabel>Статус проживания:</FormLabel>

                                <Select
                                    value={statusAccommodation}
                                    size="lg"
                                    isDisabled={editmode}
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
                    >
                        Подтвердить и сохранить
                    </Button>
                </>
            )}
        </div>
    );
};

export default ResidentProfile;
