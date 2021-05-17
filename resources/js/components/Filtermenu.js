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
    Select,Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
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
        const arr = FIO.split(' ')
        const Data = {
            isFiltred: isFiltred,
            FamilyName: arr[0]? arr[0] : "" ,
            Name:  arr[1]? arr[1] : "" ,
            Patronymic :  arr[2]? arr[2] : "" ,
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
                {isFiltred && <Button
                        bg="rgba(255,255,255,0.1)"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                             setIsFiltred(false)
                            setSex("");
                            setCitizenship("");
                            setFIO("");
                            setStatusAccommodation("")
                            handleFilter();
                        }}
                    >

                    </Button>}
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
                            setCitizenship("");
                            setTimeout(handleFilter(),1000);
                            handleFilter();
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
                            setSex("");
                            handleFilter();
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
                            setStatusAccommodation("");
                            handleFilter();
                        }}
                    >
                        {statusAccommodation}
                    </Button>
                )}
            </HStack>

            <Drawer placement="top" my="auto" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader color={"blue.700"}>Фильтрация</DrawerHeader>

                    <DrawerBody pb={6}>
                        <FormControl>
                            <FormLabel>Поиск по ФИО</FormLabel>
                            <Input
                                placeholder="ФИО"
                                fontWeight="600"
                                color="black"
                                backgroundColor="rgba(0,90,174,0.2)"
                                borderRadius="6%"
                                textAlign="center"
                                _placeholder={{ color: "white" }}
                                _focus={{ opacity: "100%" }}
                                onChange={(event) => {
                                    setFIO(event.currentTarget.value);
                                    setIsFiltred(true);
                                    handleFilter();
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Поиск по Гражданству</FormLabel>
                            <Input
                                placeholder="Гражданство"
                                fontWeight="600"
                                color="black"
                                backgroundColor="rgba(0,90,174,0.2)"
                                borderRadius="6%"
                                textAlign="center"
                                _placeholder={{ color: "white" }}
                                _focus={{ opacity: "100%" }}
                                onChange={(event) => {
                                    setCitizenship(event.currentTarget.value);
                                    setIsFiltred(true);
                                    handleFilter();
                                }}
                            />
                        </FormControl>
                        <HStack>
                            <FormControl>
                                <FormLabel>Пол</FormLabel>
                                <Select
                                    placeholder={sex ? sex : "Пол"}
                                    fontWeight="600"
                                    color="black"
                                    backgroundColor="rgba(0,90,174,0.2)"
                                    borderRadius="6%"
                                    textAlign="center"
                                    _placeholder={{ color: "white" }}
                                    _focus={{ opacity: "100%" }}
                                    onChange={(event) => {
                                        setSex(event.currentTarget.value);
                                        setIsFiltred(true);
                                        handleFilter();
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
                                <FormLabel>Статус проживания</FormLabel>
                                <Select
                                    placeholder={
                                        statusAccommodation
                                            ? statusAccommodation
                                            : "Статус проживания"
                                    }
                                    fontWeight="600"
                                    color="black"
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
                    </DrawerBody>

                    <ModalFooter>
                        <Button onClick={() => {
                            handleFilter();
                            onClose()
                        } } colorScheme="blue" mr={3}>
                            Применить
                        </Button>
                        <Button
                            onClick={() => {
                                setFIO("");
                                setCitizenship("");
                                setIsFiltred(false);
                                handleFilter();
                                onClose();
                            }}
                        >
                            Отмена
                        </Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Filtermenu;
