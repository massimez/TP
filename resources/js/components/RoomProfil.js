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
    Box,Text
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
            <Modal isOpen={props.isOpen} onClose={props.onClose}  size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="blue.800">Комната №{props.roomFocus} <Text fontSize="14px" fontWeight="500" color="#A1A1A1">В данной комнате проживают следующие студенты</Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <Box  border="1px solid" borderColor="#005AAE1A" borderRadius="md">
                    <Table variant="striped"  colorScheme="cyan" color="cyan" borderRadius="md">
                            <Thead bg="blue.300"  >
                                <Tr>
                                    <Th>ФИО</Th>
                                    <Th>Факультет</Th>
                                    <Th>Курс</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {props.rooms &&
                                    props.rooms.map((rm, index) => (
                                        <Tr key={index} bg="rgba(0, 90, 174, 0.1)">
                                            <Th>
                                                {rm.name} {rm.surname}
                                            </Th>
                                            <Th>{rm.faculty}</Th>
                                            <Th>{rm.course_of_study}</Th>
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
                    </Box>

                    </ModalBody>
                    <ModalFooter>
                        <Button mx="auto" colorScheme="facebook" width="168px" onClick={props.onClose}>Ok</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    );
};

export default RoomProfil;
