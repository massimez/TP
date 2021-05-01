import React, { useState , useEffect } from "react";
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
    FormControl,
    Inputcontrol,
    Select,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Radio,AdaptedRadioGroup,
} from "@chakra-ui/react";
import FreeroomDialog from "./FreeroomDialog";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";



function FormResident() {
    const bg = useColorModeValue("white", "blue.300");
    const color = useColorModeValue("bluet.900", "gray.800");

    const [SelectedRoom, setSelectedRoom] = useState('');
    const [succesAdd,setSuccesAdd] = useState(false);
    const [errorAdd , setErrorAdd] = useState(false);
    const [freeRooms, setFreeRooms] = useState([]);
    const [groups, Setgroups] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGroup = async () => {
          const res = await axios.get('/api/group').then((ress)=>{
            Setgroups(ress.data.data);
          }).catch((err) => {
           console.log(err);
        });

        };
        fetchGroup();
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
                    Dpassport:"",
                    info_passport: "",
                    citizenship: "",
                    place_of_birth: "",
                    registration:"",
                    status_student:"",
                    room_id:"",
                    group:"",
                    note:"default",

                }}
                onSubmit={(values, actions) => {
                    values.room_id= SelectedRoom;
                    values.info_passport =  values.passportIssuer + " " + values.Dpassport ;
                    axios
                        .post("/api/student", values)
                        .then((res) => {

                            console.log(res);
                            setSuccesAdd("Операция успешна " + res.data.name + " " + JSON.stringify(res.data.message ) )

                        })
                        .catch((err) => {
                            if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
                            console.log(err);
                            let toStringgg ="Error "+ err.response.status + " " + JSON.stringify(err.response.data.message) ;
                                                        setError(toStringgg);
                        });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    actions.resetForm();
                    console.log("dsds" + SelectedRoom);

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
                            {error && <ErrorMessage message={error} />}
                            {succesAdd && <SuccesMessage message={succesAdd} />}
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
                                        type="text"
                                        name="birthday"
                                        placeholder="Дата рождения  ДД-ММ-ГГГГ"
                                    />
                                    <SelectField
                                        name="sex"
                                        placeholder="Пол"
                                        textAlign="center"

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
                                    {formik.errors.name && (
                                        <div id="feedback">
                                            {formik.errors.name}
                                        </div>
                                    )}
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
                                    <Textfield
                                        type="text"
                                        name="group"
                                        placeholder="Группа"
                                    />
                                    <Textfield
                                        type="text"
                                        name="status_student"
                                        placeholder="Статус студента"
                                    />
                                </Box>
                                <Box py="2" justify="center" align="center">
                                  <FreeroomDialog  setSelectedRoom={setSelectedRoom} SelectedRoom={SelectedRoom} formik={formik.handleSubmit}/>
                                </Box>
                                <Box py="2" justify="center" align="center">
                                    <Button
                                        color="whiteAlpha.900"
                                        width="450px"
                                        height="60px"
                                        bg="bluet.900"
                                        type="submit"
                                    >
                                        Добавить студента
                                    </Button>
                                </Box>

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
