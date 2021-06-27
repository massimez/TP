import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalCloseButton,
    Button,
    Icon,
    leftIcon,
    useDisclosure,
    HStack,
    Select,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Box,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { setResidentsFilter } from "../store/actions/studentAction";

const Filtermenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [FIO, setFIO] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [sex, setSex] = useState("");
    const [statusAccommodation, setStatusAccommodation] = useState("");
    const [isFiltred, setIsFiltred] = useState(false);
    const dispatch = useDispatch();

    const handleFilter = () => {
        const arr = FIO.split(" ");
        const Data = {
            isFiltred: isFiltred,
            FamilyName: arr[0] ? arr[0] : "",
            Name: arr[1] ? arr[1] : "",
            Patronymic: arr[2] ? arr[2] : "",
            citizenship: citizenship,
            sex: sex,
            statusAccommodation: statusAccommodation,
        };
        dispatch(setResidentsFilter(Data));
    };

    return (
        <>
            <HStack>
                <Button
                    mr={2}
                    width="164px"
                    height="50px"
                    onClick={onOpen}
                    leftIcon={<Icon as={FiFilter} />}
                >
                    Фильтрация
                </Button>
                {isFiltred && (
                    <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            Promise.all(setIsFiltred(false),
                            setSex(""),
                            setCitizenship(""),
                            setFIO(""),
                            setStatusAccommodation(""),
                            handleFilter())

                        }}
                    ></Button>
                )}
                {FIO && (
                    <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            setFIO("");
                            handleFilter();
                        }}
                    >
                        {FIO}
                    </Button>
                )}
                {citizenship && (
                    <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            Promise.all(setCitizenship(""),
                            handleFilter(),
                            handleFilter())
                        }}
                    >
                        {citizenship}
                    </Button>
                )}
                {sex && (
                    <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            Promise.all(setSex(""),
                            handleFilter())

                        }}
                    >
                        {sex}
                    </Button>
                )}
                {statusAccommodation && (
                    <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            Promise.all(setStatusAccommodation(""),handleFilter())

                        }}
                    >
                        {statusAccommodation}
                    </Button>
                )}
            </HStack>

            <Modal placement="top" my="auto" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"blue.700"}>
                    Фильтрация{" "}
                    <HStack>

                        {
                            isFiltred?<Button
                                ml="auto"
                                height="35px"
                                colorScheme="facebook"
                                onClick={() => {
                                    Promise.all([setFIO(""),
                                    setCitizenship(""),setSex(""),
                                    setIsFiltred(false),
                                    handleFilter(),setStatusAccommodation(""),
                                    onClose()])

                                }}
                            >
                                Сбросить
                            </Button>:null
                        }

                    </HStack>
                        <Text fontSize="14px" fontWeight="500" color="#A1A1A1">
                            Заполните необходимые поля
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                height="56px"
                                placeholder="ФИО"
                                fontWeight="600"
                                color="black"
                                backgroundColor="rgba(0,90,174,0.2)"
                                borderRadius="6%"
                                textAlign="center"
                                _placeholder={{ color: "#8B8B8B" }}
                                _focus={{ opacity: "100%" }}
                                onChange={(event) => {
                                    setFIO(event.currentTarget.value);
                                    setIsFiltred(true);
                                    handleFilter();
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <Input
                                height="56px"
                                placeholder="Гражданство"
                                fontWeight="600"
                                color="black"
                                backgroundColor="rgba(0,90,174,0.2)"
                                borderRadius="6%"
                                textAlign="center"
                                _placeholder={{ color: "#8B8B8B" }}
                                _focus={{ opacity: "100%" }}
                                onChange={(event) => {
                                    setCitizenship(event.currentTarget.value);
                                    setIsFiltred(true);
                                    handleFilter();
                                }}
                            />
                        </FormControl>
                        <HStack mt={4}>
                            <FormControl>
                                <Select
                                    id="sex"
                                    height="56px"
                                    placeholder={sex ? sex : "Пол"}
                                    fontWeight="600"
                                    color="#8B8B8B"
                                    backgroundColor="rgba(0,90,174,0.2)"
                                    borderRadius="6%"
                                    style={{ textAlignLast: "center" }}
                                    textAlign="center"
                                    _placeholder={{ color: "white" }}
                                    _focus={{ opacity: "100%" }}
                                    onChange={(event) => {
                                        setSex(event.currentTarget.value);
                                        setIsFiltred(true);
                                        handleFilter();
                                        document.getElementById(
                                            "sex"
                                        ).style.color = "black";
                                    }}
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
                            </FormControl>
                            <FormControl>
                                <Select
                                    id="livingstatusSelect"
                                    height="56px"
                                    style={{ textAlignLast: "center" }}
                                    placeholder={
                                        statusAccommodation
                                            ? statusAccommodation
                                            : "Статус проживания"
                                    }
                                    fontWeight="600"
                                    color="#8B8B8B"
                                    backgroundColor="rgba(0,90,174,0.2)"
                                    borderRadius="6%"
                                    textAlign="center"
                                    _placeholder={{ color: "white" }}
                                    _focus={{ opacity: "100%" }}
                                    onChange={(event) => {
                                        setStatusAccommodation(
                                            event.currentTarget.value
                                        );
                                        setIsFiltred(true);
                                        handleFilter();
                                        document.getElementById(
                                            "livingstatusSelect"
                                        ).style.color = "black";
                                    }}
                                >
                                    <option
                                        style={{ color: "blue" }}
                                        value="Проживает"
                                    >
                                        Проживает
                                    </option>
                                    <option
                                        style={{ color: "red" }}
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
                            </FormControl>
                        </HStack>
                        <Box mt={4} width="100%">
                            <Button
                                mx="auto"
                                height="70px"
                                width="100%"
                                onClick={() => {
                                    handleFilter();
                                    onClose();
                                }}
                                colorScheme={isFiltred?"facebook":"teal"}
                            >
                                Применить
                            </Button>
                        </Box>
                        <Box width="100%">
                            <Button
                                mx="auto"
                                height="70px"
                                width="100%"
                                colorScheme="gray.300"
                                color="#FF0000"
                                onClick={() => {
                                    Promise.all([setFIO(""),
                                    setCitizenship(""),setSex(""),
                                    setIsFiltred(false),
                                    handleFilter(),setStatusAccommodation(""),
                                    onClose()])

                                }}
                            >
                                Отмена
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Filtermenu;
