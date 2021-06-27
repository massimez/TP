import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    FormControl,
    FormLabel,
    Input,
    TableCaption,
    Button,
    useDisclosure,
    Box,Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import ResidentProfile from "./ResidentProfile";
import PageLoader from "./PageLoader";
import axios from "axios";
export const Students = ({ posts, loading , setRerenderChange} ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editmode, setEditMode] = useState(false);
    const [residentFocus, setResidentFocus] = useState("");
     if (loading) {
         return <PageLoader />;
     }
    const handle = (evt) => {
        setResidentFocus(evt);
    };
    const handleDownl = (id)=>{
        axios({
            url: `api/createDoc/${id}`, //your url
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', `Contract${id}.docx`); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }

    return (
        <Box mt={2} border="1px  solid" borderColor="blue.300" borderRadius="md">
            <Table variant="striped"  >
                <Thead bg="blue.300" color="white" >
                    <Tr>
                        <Th color="white">ФИО</Th>
                        <Th color="white">Пол</Th>
                        <Th color="white">Грожданство</Th>
                        <Th color="white">Факультет</Th>
                        <Th color="white">Тип специальности</Th>
                        <Th color="white">Статус студент</Th>
                        <Th color="white">Статус проживание</Th>
                    </Tr>
                </Thead>
                <Tbody color="black" bg="white">
                    {posts.map((post, index) => (
                        <Tr
                            key={post.student_id}
                            onClick={() => {
                                handle(posts[index]);
                                onOpen();
                            }}
                            _hover={{cursor:"pointer"}}

                        >
                            <Th>
                               {post.surname} {post.name}  {post.patronymic}
                            </Th>
                            <Th>{post.sex}</Th>
                            <Th>{post.citizenship}</Th>
                            <Th>{post.citizenship}</Th>
                            <Th>{post.citizenship}</Th>
                            <Th>{post.status_student}</Th>
                            <Th>{post.status_accommodation}</Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal placement="bottom" size="2xl" isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Профиль</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3}>
                        <ResidentProfile
                            residentFocus={residentFocus}
                            editmode={editmode}
                            setRerenderChange={setRerenderChange}
                            setEditMode={setEditMode}
                            onClose={onClose}
                            onOpen={onOpen}
                        />
                    </ModalBody>
                    <ModalFooter>

                        {!editmode && (
                            <Button colorScheme="blue" mr={3} onClick={()=> handleDownl(residentFocus.student_id) }>
                                Скачать договор
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                setEditMode(!editmode);
                            }}
                        >
                            {editmode ? "Отменить " : "Редактировать данные"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
