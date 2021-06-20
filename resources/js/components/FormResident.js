import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Textfield } from "./scripts/Textfield";
import SelectField from "./scripts/SelectField";
import SelectGroup from "./scripts/SelectGroup";
import axios from "axios";
import {
    useColorModeValue,
    useColorMode,
    FormLabel,
    Heading,
} from "@chakra-ui/react";
import {
    Box,
    Button,
    Flex,
    Select,
    Input,
} from "@chakra-ui/react";
import FreeroomDialog from "./FreeroomDialog";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";
import * as Yup from "yup";
import { values } from "lodash";

function FormResident() {
    const bg = useColorModeValue("white", "blue.300");
    const color = useColorModeValue("bluet.900", "gray.800");

    const [SelectedRoom, setSelectedRoom] = useState("");
    const [succesAdd, setSuccesAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(false);
    const [freeRooms, setFreeRooms] = useState([]);
    const [groups, Setgroups] = useState([]);
    const [status, setStatus] = useState([]);
    const [error, setError] = useState("");
    const [sex, setSex] = useState("");
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = Yup.object({
        name: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        surname: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        patronymic: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        birthday: Yup.date(
            "Format date invalid should be YYYY-MM-DD"
        ).required(),
        email: Yup.string().email("Email is invalid").required("Required"),
        phone_number: Yup.string().matches(
            phoneRegExp,
            "Phone number is not valid"
        ),
        passportIssuer: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        citizenship: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        place_of_birth: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
        registration: Yup.string()
            .max(20, "Must be 15 characters")
            .min(2, "Too Short!")
            .required("Required"),
    });
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
        fetchGroup();
    }, []);
    useEffect(() => {
        const fetchStatus = async () => {
            await axios
                .get("/api/status")
                .then((ress) => {
                    setStatus(ress.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchStatus();
    }, []);

    return (
        <>
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
                    Dpassport: "",
                    info_passport: "",
                    citizenship: "",
                    place_of_birth: "",
                    registration: "",
                    status_student: "",
                    room_id: "",
                    group: "",
                    note: "default",
                }}
                onSubmit={(values, actions) => {
                    values.room_id = SelectedRoom;
                    values.sex = sex;
                    values.info_passport =
                        values.passportIssuer + " " + values.Dpassport;
                    axios
                        .post("/api/student", values)
                        .then((res) => {
                            //console.log(res);
                            setSuccesAdd(
                                "Операция успешна " +
                                    res.data.name +
                                    " " +
                                    JSON.stringify(res.data.message)
                            );
                            actions.resetForm();
                        })
                        .catch((err) => {
                            if (err.response) {
                                console.log(err.response.data);
                                console.log(err.response.status);
                                console.log(err.response.headers);
                            }
                            let toStringgg =
                                "Произошла ошибка, пожалуйста, проверьте данные еще раз " +
                                err.response.status +
                                " " +
                                JSON.stringify(err.response.data.message);
                            setError(toStringgg);
                        });
                    //alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
                validationSchema={validationSchema}
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
                                {error && <ErrorMessage message={error} />}
                                {succesAdd && (
                                    <SuccesMessage message={succesAdd} />
                                )}
                                <Heading as="h5" size="md" color="#8B8B8B">
                                    Общая информация
                                </Heading>
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
                                        isRequired={true}
                                    />
                                    <Textfield
                                        type="text"
                                        name="surname"
                                        placeholder="Имя"
                                        isRequired={true}
                                    />
                                    <Textfield
                                        type="text"
                                        name="patronymic"
                                        placeholder="Отчество (при наличии)"
                                    />
                                    <Textfield
                                        type="date"
                                        name="birthday"
                                        placeholder="Дата рождения  ГГГГ-ММ-ДД"
                                    />
                                    <SelectField
                                        name="sex"
                                        placeholder={sex ? sex : "ПОЛ"}
                                        textAlign="center"
                                        setSex={setSex}
                                    />
                                    <Textfield
                                        type="tel"
                                        name="phone_number"
                                        placeholder="Номер телефон"
                                    />
                                    <Textfield
                                        type="email"
                                        name="email"
                                        placeholder="Е-mail"
                                    />
                                </Box>
                            </Box>

                            <Box px="5" mb="5">
                                <Heading as="h5" size="md" color="#8B8B8B">
                                    Паспортные данные
                                </Heading>
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
                                        name="passportIssuer"
                                        placeholder="Кем выдан"
                                    />
                                    <Textfield
                                        type="text"
                                        name="Dpassport"
                                        placeholder="Дата выдачи ГГГГ-ММ-ДД"
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
                                        name="place_of_birth"
                                        placeholder="Место рождения"
                                    />
                                </Box>
                            </Box>

                            <Box px="5">
                                <Heading as="h5" size="md" color="#8B8B8B">
                                    Данные студента
                                </Heading>
                                <Box
                                    border="4px"
                                    borderRadius="16px"
                                    borderColor="rgba(139,139,139,0.5)"
                                    p="10px"
                                >
                                    <SelectGroup
                                        name="group"
                                        placeholder="Группа"
                                        textAlign="center"
                                        groups={groups}
                                    />
                                    <SelectGroup
                                        name="status_student"
                                        placeholder="Статус студента"
                                        textAlign="center"
                                        groups={status}
                                    />

                                </Box>
                                <Box py="2" justify="center" align="center">
                                    <FreeroomDialog
                                        setSelectedRoom={setSelectedRoom}
                                        SelectedRoom={SelectedRoom}
                                        formik={formik.handleSubmit}
                                        sex={sex}
                                        w={[250, 400, 450]}
                                        h={"60px"}
                                    />
                                </Box>
                                {/* <Box py="2" justify="center" align="center">
                                    <Button
                                        color="whiteAlpha.900"
                                        width="450px"
                                        height="60px"
                                        bg="bluet.900"
                                        type="submit"
                                    >
                                        Добавить студента
                                    </Button>
                                </Box> */}
                                <button type="submit">Submit</button>
                                <Button type="reset">Reset</Button>
                            </Box>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default FormResident;

