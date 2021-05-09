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
export const Students = ({ posts, loading }) => {
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
                {/* <Tfoot bg="blue.100" opacity="80%">
    <Tr>
       <Th>ФИО</Th>
      <Th>Пол</Th>
      <Th >Грожданство</Th>
      <Th >Факультет</Th>
      <Th >Тип специальности</Th>
      <Th >Статус студент</Th>
      <Th >Статус проживание</Th>
    </Tr>
  </Tfoot> */}
            </Table>
            <Drawer placement="bottom" size="full" isOpen={isOpen} onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Профиль</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={3}>
                        <ResidentProfile
                            residentFocus={residentFocus}
                            editmode={editmode}
                        />
                    </DrawerBody>
                    <DrawerFooter>

                        {!editmode && (
                            <Button colorScheme="blue" mr={3} onClick={()=> handleDownl(residentFocus.student_id) }>
                                Скачать догвор
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                setEditMode(!editmode);
                            }}
                        >
                            {editmode ? "Отменить " : "Редактировать данные"}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
