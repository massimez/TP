import React, { useState } from "react";
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
    Button,Wrap, useToast
} from "@chakra-ui/react";
import axios from 'axios'
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
                        position:"top",
                        status: "success",
                        isClosable: true,
                      })
                    props.setEditMode(!editmode)
                    props.onClose()

                })
                .catch((err) => {
                    toast({
                        title: `Произошла ошибка, пожалуйста, проверьте данные еще раз`,
                        position:"top",
                        status: "error",
                        isClosable: true,
                      })
                    console.log(err.response.data.errors);
                });
        }, 1000);
    };
    const handleVesli = (event) => {
        event.preventDefault();
        const data = {
            room_id: room,
            status_accommodation: "Выселен",
        }
        setTimeout(() => {
            axios
                .put(`/api/student/${resident.student_id}`, data)
                .then((res) => {
                    props.setRerenderChange(res);
                    toast({
                        title: `Успешно `,
                        position:"top",
                        status: "success",
                        isClosable: true,
                      })
                    props.setEditMode(!editmode)
                    props.onClose()

                })
                .catch((err) => {
                    toast({
                        title: `Произошла ошибка, пожалуйста, проверьте данные еще раз`,
                        position:"top",
                        status: "error",
                        isClosable: true,
                      })
                    console.log(err.response.data.errors);
                });
        }, 1000);

    }

    return (
        <div>
            <Tabs variant="enclosed" colorScheme="blue" orientation="vertical">
                <TabList>
                    <Tab>Общая информация</Tab>
                    <Tab>Паспортные данные</Tab>
                    <Tab>Данные студента</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl>
                            <FormLabel>Фамилия:</FormLabel>
                            <Input
                                type="text"
                                value={surname}
                                onChange={(event) =>
                                    setSurname(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
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
                        </FormControl>
                        <FormControl mt={1}>
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
                        </FormControl>
                        <FormControl mt={1}>
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
                                    size="md"
                                    onChange={(event) =>
                                        setRoom(event.currentTarget.value)
                                    }
                                    isDisabled={editmode}
                                />
                               {!editmode?<FreeroomDialog
                                        setSelectedRoom={setRoom}
                                        SelectedRoom={room}
                                        sex={sex}
                                        size={"sm"}
                                        w={"200px"}
                                        h={"40px"}
                                        name={"Выбрать комнату"}
                                    />:null}
                            </HStack>
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <FormLabel>Серия и номер паспорта:</FormLabel>
                            <Input
                                type="text"
                                value={passportNumber}
                                size="lg"
                                onChange={(event) =>
                                    setPassportNumber(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Кем выдан и Дата выдачи:</FormLabel>
                            <Input
                                type="text"
                                value={infoPassport}
                                size="lg"
                                onChange={(event) =>
                                    setInfoPassport(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Прописка:</FormLabel>
                            <Input
                                type="text"
                                value={registration}
                                size="lg"
                                onChange={(event) =>
                                    setRegistration(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Гражданство:</FormLabel>
                            <Input
                                type="text"
                                value={citizenship}
                                size="lg"
                                onChange={(event) =>
                                    setCitizenship(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Место рождения:</FormLabel>
                            <Input
                                type="text"
                                value={birthPlace}
                                size="lg"
                                onChange={(event) =>
                                    setBirthPlace(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        {/* Third part panel */}
                        <FormControl mt={1}>
                            <FormLabel>Тип специальности:</FormLabel>
                            <Input
                                type="text"
                                value=""
                                size="lg"
                                onChange={(event) =>
                                    setBirthPlace(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Факультет:</FormLabel>
                            <Input
                                type="text"
                                value=""
                                size="lg"
                                onChange={(event) =>
                                    setBirthPlace(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Форма обучения:</FormLabel>
                            <Input
                                type="text"
                                value=""
                                size="lg"
                                onChange={(event) =>
                                    setBirthPlace(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Группа:</FormLabel>
                            <Input
                                type="text"
                                value={group}
                                size="lg"
                                onChange={(event) =>
                                    setGroup(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Статус студента:</FormLabel>
                            <Input
                                type="text"
                                value={statusStudent}
                                size="lg"
                                onChange={(event) =>
                                    setStatusStudent(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Статус проживания:</FormLabel>
                            <Input
                                type="text"
                                value={statusAccommodation}
                                size="lg"
                                onChange={(event) =>
                                    setAccommodation(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {!editmode &&<> <AlertDel css={{float:"right"}}  handleVesli={handleVesli} btnmsg={"Выселить"} msg={"Are sure ?"}/> <Button css={{float:"right"}}  onClick={handleSubmit} colorScheme="blue">Подтвердить и сохранить</Button> </>}
        </div>
    );
};

export default ResidentProfile;
