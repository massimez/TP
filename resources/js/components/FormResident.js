import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Textfield } from "./scripts/Textfield";
import SelectField from "./scripts/SelectField";
import { useColorModeValue,useColorMode } from "@chakra-ui/react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Inputcontrol,
    Select,
} from "@chakra-ui/react";
function FormResident() {
    const bg = useColorModeValue("white", "blue.300")
    const color = useColorModeValue("bluet.900", "gray.800")
    // const [emailAddress, setEmailAdress] = useState('');
    // const [familyName,setFamilyName] = useState('');
    // const [firstName,setFristName] = useState('');
    // const [patronymicName,setPatronymicName] = useState('');
    // const [bDay,setBday] = useState('');
    // const [gender,setGender] = useState('');
    // const [email,setEmail] = useState('');

    // const [passportSerial,setPassportSerial] = useState('');
    // const [passportNumber,setPassportNumber] = useState('');
    // const [passportIssuer,setPassportIssuer] = useState('');
    // const [passportDateD,setPassportDateD] = useState('');
    // const [passportPrapiska,setPassportPrapiska] = useState('');
    // const [nationality,setNationality] = useState('');
    // const [bPlace,setBPlace] = useState('');

    // const [speciality,setSpeciality] = useState('');
    // const [faculty,setFaculty] = useState('');
    // const [groupe,setGroupe] = useState('');
    // const [studentStatus,setStudentStatus] = useState('');
    return (
        <Formik
            initialValues={{
                name: "",
                surname: "",
                patronymic: "",
                birthday: "",
                sex: "",
                email: "",
                phone_number: "",
                passportSerial: "",
                number_passport: "",
                passportIssuer: "",
                passportDateD: "",
                passportPrapiska: "",
                citizenship: "",
                birthday: "",
            }}
            onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Flex
                        bg={bg}
                        justify="center"
                        mx="5%"
                        p="20px"
                        borderRadius="1%"
                        flexWrap="wrap"
                    >
                        <Box px="5" mb="5">
                            <heading as="h5" color="#8B8B8B">
                                Общая информация
                            </heading>
                            <Box
                                border="4px"
                                borderRadius="16px"
                                borderColor="rgba(139,139,139,0.5)"
                                p="10px"
                            >
                                <Textfield
                                    type="text"
                                    name="name"
                                    placeholder="Фамилия"
                                />
                                <Textfield
                                    type="text"
                                    name="surname"
                                    placeholder="Имя"
                                />
                                <Textfield
                                    type="text"
                                    name="patronymic"
                                    placeholder="Отчество (при наличии)"
                                />
                                <Textfield
                                    type="text"
                                    name="birthday"
                                    placeholder="Дата рождения  ДД-ММ-ГГГГ"
                                />
                                <SelectField
                                    name="sex"
                                    placeholder="Пол"
                                    textAlign="center"
                               / >
                                <Textfield
                                    type="tel"
                                    name="telephone"
                                    placeholder="Номер телефон"
                                />
                                <Textfield
                                    type="email"
                                    name="email"
                                    placeholder="Е-mail"
                                />
                                {formik.errors.name && (
                                    <div id="feedback">
                                        {formik.errors.name}
                                    </div>
                                )}
                            </Box>
                        </Box>

                        <Box px="5" mb="5">
                            <heading as="h5" color="#8B8B8B">
                                Паспортные данные
                            </heading>
                            <Box
                                border="4px"
                                borderRadius="16px"
                                borderColor="rgba(139,139,139,0.5)"
                                p="10px"
                            >
                                <Textfield
                                    type="text"
                                    name="number_passport"
                                    placeholder="Номер паспорт"
                                />
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Кем выдан"
                                />
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Дата выдачи ДД-ММ-ГГГГ"
                                />
                                <Textfield
                                    type="text"
                                    name="registration"
                                    placeholder="Прописка по паспорту"
                                />
                                <Textfield
                                    type="text"
                                    name="citizenship"
                                    placeholder="Гражданство"
                                />
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Место рождения"
                                />
                            </Box>
                        </Box>

                        <Box px="5">
                            <heading as="h5" color="#8B8B8B">
                                Данные студента
                            </heading>
                            <Box
                                border="4px"
                                borderRadius="16px"
                                borderColor="rgba(139,139,139,0.5)"
                                p="10px"
                            >
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Место рождения"
                                />
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Место рождения"
                                />
                                <Textfield
                                    type="text"
                                    name="?"
                                    placeholder="Место рождения"
                                />

                            </Box>
                            <Box py="2"justify="center" align="center">
                                    <Button color="whiteAlpha.900" width="450px" height="60px" bg="bluet.900" type="submit">
                                        Добавить студента
                                    </Button>
                                </Box>
                                <Box py="2" justify="center" align="center">
                                    <Button color="whiteAlpha.900" width="450px" height="60px" bg="bluet.900" type="submit">
                                        Добавить и выбрать комнату
                                    </Button>
                                </Box>

                                <Button type="reset">Reset</Button>
                        </Box>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
}

export default FormResident;
