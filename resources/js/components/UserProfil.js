import React from 'react'
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,MenuItem,
  } from '@chakra-ui/react';
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure
  } from "@chakra-ui/react"
  import { Link, Redirect } from "react-router-dom";
  import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";
const UserProfil = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useSelector(state => state.auth.user)
    return (
        <>
        {/* <Button w="100%" p="0" m="0" onClick={()=>{onOpen()
                            console.log("Clicked")}}><MenuItem  icon={<FaUserCircle />} command="⌘T">
                        Профиль
                    </MenuItem></Button> */}
                    <div  onClick={()=>{onOpen()
                            console.log("Clicked")}}><MenuItem  icon={<FaUserCircle />} command="⌘T">
                        Профиль
                    </MenuItem></div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
            <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.name} {user.surname}
            </Heading>
            <Text color={'gray.500'}>{user.position} {user.role}</Text>
          </Stack>
          <Stack spacing={0} align={'center'} mb={5}>
            <Text color={'gray.500'}>{user.email} </Text>
          </Stack>
            <Link to="/passwordReset">Изменить пароль</Link>
        </Box>
      </Box>
    </Center>
            </ModalBody>

          </ModalContent>
        </Modal>
        </>
    )
}

export default UserProfil
