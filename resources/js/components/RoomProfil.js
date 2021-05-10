import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";

const RoomProfil = (props) => {
    const [room, setRoom] = useState([]);
    let n=5;

    return (
            <Drawer isOpen={props.isOpen} onClose={props.onClose}  placement="top">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Комната №{props.roomFocus} </DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <Table variant="striped" colorScheme="teal" border="1px  solid">
                            <Thead bg="blue.300" border="1px  solid" borderColor="blue.300" borderRadius="md" >
                                <Tr>
                                    <Th>ФИО</Th>
                                    <Th>Факультет</Th>
                                    <Th>Курс</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {props.rooms &&
                                    props.rooms.map((rm, index) => (
                                        <Tr key={index}>
                                            <Th>
                                                {rm.name} {rm.surname}
                                            </Th>
                                            <Th>Факультет</Th>
                                            <Th>Курс</Th>
                                        </Tr>
                                    ))}

                                {props.rooms && [...Array(n)].map((e, i) =>
                                    {
                                        <Tr key={i}>
                                            <Th></Th>
                                            <Th>Свободное место</Th>
                                            <Th></Th>
                                        </Tr>;
                                    })}
                            </Tbody>
                        </Table>
                    </DrawerBody>
                    <ModalFooter>
                        <Button onClick={props.onClose}>Close</Button>
                    </ModalFooter>
                </DrawerContent>
            </Drawer>
    );
};

export default RoomProfil;
