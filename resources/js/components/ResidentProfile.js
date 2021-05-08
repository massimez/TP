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
} from "@chakra-ui/react";

const ResidentProfile = (props) => {
    console.log(props.residentFocus);
    const resident = props.residentFocus;
    const [name, setName] = useState(resident.name);
    const [surname, setSurname] = useState(resident.surname);
    const [patname, setPatname] = useState(resident.patronymic);
    const [birthday, setBirthday] = useState(resident.birthday);
    const [sex, setSex] = useState(resident.sex);
    const [phone, setPhone] = useState(resident.phone_number);
    const [email, setEmail] = useState(resident.email);
    const [room, setRoom] = useState(resident.room_id);
    const  [passportNumber,setPassportNumber] = useState(resident.number_passport);
    const  [infoPassport,setInfoPassport] = useState(resident.info_passport);
    const  [registration,setRegistration] = useState(resident.registration);
    const  [citizenship,setCitizenship] = useState(resident.citizenship);
    const  [birthPlace,setBirthPlace] = useState(resident.place_of_birth);

    const  [statusStudent,setStatusStudent] = useState(resident.status_student);
    const  [statusAccommodation,setAccommodation] = useState(resident.status_accommodation);
    const  [group,setGroup] = useState(resident.group);


    console.log(sex);
    const editmode = !props.editmode;
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
                                size="lg"
                                onChange={(event) =>
                                    setSurname(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Имя:</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                size="lg"
                                onChange={(event) =>
                                    setName(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Отчество:</FormLabel>
                            <Input
                                type="text"
                                value={patname}
                                size="lg"
                                onChange={(event) =>
                                    setPatname(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Дата рождения:</FormLabel>
                            <Input
                                type="text"
                                value={birthday}
                                size="lg"
                                onChange={(event) =>
                                    setBirthday(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>

                        <FormLabel>Пол:</FormLabel>
                        <Select
                            placeholder={sex}
                            value={sex}
                            size="lg"
                            onChange={(event) =>
                                setSex(event.currentTarget.value)
                            }
                            isDisabled={editmode}
                        >
                            <option style={{ color: "blue" }} value="МУЖСКОЙ">
                                МУЖСКОЙ
                            </option>
                            <option style={{ color: "red" }} value="ЖЕНСКИЙ">
                                ЖЕНСКИЙ
                            </option>
                        </Select>

                        <FormControl mt={4}>
                            <FormLabel>Номер телефона:</FormLabel>
                            <Input
                                type="tel"
                                value={phone}
                                size="lg"
                                onChange={(event) =>
                                    setPhone(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>E-mail:</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                size="lg"
                                onChange={(event) =>
                                    setEmail(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>№ комнаты:</FormLabel>
                            <Input
                                type="text"
                                value={room}
                                size="lg"
                                onChange={(event) =>
                                    setRoom(event.currentTarget.value)
                                }
                                isDisabled={editmode}
                            />
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
                        <FormControl mt={4}>
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
                        <FormControl mt={4}>
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
                        <FormControl mt={4}>
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
                        <FormControl mt={4}>
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
                        <FormControl mt={4}>
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
                            <FormControl mt={4}>
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
                            <FormControl mt={4}>
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
                            <FormControl mt={4}>
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
                            <FormControl mt={4}>
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
                            <FormControl mt={4}>
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
        </div>
    );
};

export default ResidentProfile;
