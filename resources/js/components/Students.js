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
import PageLoader from "./PageLoader"
export const Students = ({ posts, loading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editmode,setEditMode] = useState(false);
    const [residentFocus,setResidentFocus] = useState('');
    if (loading) {
        return  <PageLoader />
    }
    const handle = (evt) => {
       setResidentFocus(evt)
    };

    return (
        <>
            <Table variant="striped">
                <Thead bg="blue.300" color="white">
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
                            onClick={() =>
                            {handle(posts[index])
                                onOpen();
                            }}
                        >
                            <Th>
                                {post.name} {post.surname} {post.patronymic}
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
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <ResidentProfile
                        residentFocus={residentFocus} editmode={editmode}
                    />

                        {/* <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder="First name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder="Last name" />
                        </FormControl> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={()=> {setEditMode(!editmode)}}>{editmode ?" " :"Редактировать данные"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
