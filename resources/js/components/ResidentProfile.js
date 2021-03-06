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

        };
        if(parseInt(room) != parseInt(resident.room_id)) data.room_id = room
        if (email != resident.email ) data.email = email;
        if ( birthday != resident.birthday) data.birthday = birthday;
        if (citizenship != resident.citizenship) data.citizenship = citizenship;
        if (group != resident.group) data.group = group;
        if (infoPassport != resident.info_passport) data.info_passport = infoPassport;
        if (name != resident.name) data.name = name;
        if (surname != resident.surname) data.surname = surname;
        if (passportNumber != resident.number_passport) data.number_passport = passportNumber;
        if (phone != resident.phone_number) data.phone_number = phone;
        if (patname != resident.patronymic) data.patronymic = patname;
        if (birthPlace != resident.place_of_birth) data.place_of_birth = birthPlace;
        if (registration != resident.registration) data.registration = registration;
        if (sex != resident.sex) data.sex = sex;
        if (statusStudent !=  resident.status_student) data.status_student = statusStudent;
        if (statusAccommodation != resident.status_accommodation) data.status_accommodation = statusAccommodation;
            axios
                .put(`/api/student/${resident.student_id}`, data)
                .then((res) => {
                    props.setRerenderChange(res);
                    toast({
                        title: `?????????????? `,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    props.onClose();
                })
                .catch((err) => {
                    toast({
                        title: `?????????????????? ????????????, ????????????????????, ?????????????????? ???????????? ?????? ??????`,
                        position: "top",
                        status: "error",
                        isClosable: true,
                    });
                });
    };
    const handleVesli = (event) => {
        event.preventDefault();
        const data = {
            room_id: room,
            status_accommodation: "??????????????",
        };
        setTimeout(() => {
            axios
                .put(`/api/student/${resident.student_id}`, data)
                .then((res) => {
                    props.setRerenderChange(res);
                    toast({
                        title: `?????????????? `,
                        position: "top",
                        status: "success",
                        isClosable: true,
                    });
                    props.setEditMode(!editmode);
                    props.onClose();
                })
                .catch((err) => {
                    toast({
                        title: `?????????????????? ????????????, ????????????????????, ?????????????????? ???????????? ?????? ??????`,
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
                        ?????????? ????????????????????
                    </Tab>
                    <Tab
                        borderBottom="1px"
                        style={{ borderColor: "#A1A1A1" }}
                        _selected={{ bg: "rgba(0,90,174,0.3)" }}
                    >
                        ???????????????????? ????????????
                    </Tab>
                    <Tab
                        borderBottom="1px"
                        style={{ borderColor: "#A1A1A1" }}
                        _selected={{ bg: "rgba(0,90,174,0.3)" }}
                    >
                        ???????????? ????????????????
                    </Tab>

                        <Box  mt="auto" mb="15px">
                            <AlertDel
                                css={{ float: "right" }}
                                handleVesli={handleVesli}
                                btnmsg={"????????????????"}
                                msg={"?????????????????????? ?"}
                            />
                        </Box>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormControl>
                            <HStack align="center">
                                <Box verticalAlign="middle" width="151px">
                                    <p>??????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                   <p>??????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                   <p>????????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>???????? ????????????????:</p>
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
                        <HStack  align="center">
                            <Box width="151px" >
                                <p>??????:</p>
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
                                    value="??????????????"
                                >
                                    ??????????????
                                </option>
                                <option
                                    style={{ color: "red" }}
                                    value="??????????????"
                                >
                                    ??????????????
                                </option>
                            </Select>
                        </HStack>

                        <FormControl mt={1}>
                            <HStack  align="center">
                            <Box width="151px" >
                                <p>?????????? ????????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
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
                            <HStack  align="center">
                                <Box width="151px" >
                                   <p> ??? ??????????????:</p>
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
                                        name={"?????????????? ??????????????"}
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
                                    ?????????????? ??????????????
                                </Button>
                            )}
                            {editmode ? (
                                <Button
                                    onClick={() => {
                                        setEditMode(!editmode);
                                    }}
                                >
                                    {editmode
                                        ? "?????????????????????????? ????????????"
                                        : "???????????????? "}
                                </Button>
                            ) : null}
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <FormControl>
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>
                                        ?????????? ?? ?????????? ????????????????:
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>
                                        ?????? ??????????:
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>????????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>??????????????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <p>?????????? ????????????????:</p>
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <FormLabel>?????? ??????????????????????????:</FormLabel>
                                </Box>{" "}
                                <Input
                                    value={resident.specialty}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack  align="center">
                                <Box width="151px" >
                                    <FormLabel>??????????????????:</FormLabel>
                                </Box>{" "}
                                <Input
                                    value={resident.faculty}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack  align="center">
                                <Box width="151px" >
                                    <FormLabel>?????????? ????????????????:</FormLabel>
                                </Box>{" "}
                                <Input
                                    value={resident.form_of_education}
                                    size="lg"
                                    isDisabled={editmode}
                                    border={editmode ? "none" : "1px"}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mt={1}>
                            <HStack  align="center">
                                <Box width="151px" >
                                    <FormLabel>????????????:</FormLabel>
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
                                    <option value={group} disabled >
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
                            <HStack  align="center">
                                <Box width="151px" >
                                    <FormLabel>???????????? ????????????????:</FormLabel>
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
                            <HStack  align="center">
                                <Box width="151px">
                                    <FormLabel>???????????? ????????????????????:</FormLabel>
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

                                    >
                                        {statusAccommodation}
                                    </option>
                                    <option
                                        style={{ color: "blue" }}
                                        value="??????????????????"
                                    >
                                        ??????????????????
                                    </option>
                                    <option
                                        style={{ color: "orange" }}
                                        value="?????????????? ???????????????????? ????????????????????"
                                    >
                                        ?????????????? ???????????????????? ????????????????????
                                    </option>
                                    <option
                                        style={{ color: "red" }}
                                        value="??????????????"
                                    >
                                        ??????????????
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
                        ?????????????????????? ?? ??????????????????
                    </Button>
                </>
            )}
        </Box>
    );
};

export default ResidentProfile;
