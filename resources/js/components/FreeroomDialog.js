import React from "react";
import { useDisclosure } from "@chakra-ui/react";
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
    ModalBody,RadioGroup,Stack,VStack,
    ModalCloseButton,Radio,AdaptedRadioGroup,
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
  } from "@chakra-ui/react"
const FreeroomDialog = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button
                type="button"
                color="whiteAlpha.900"
                width="450px"
                height="60px"
                background-color="bluet.900"
                onClick={onOpen}
            >
                Добавить и выбрать комнату
            </Button>

            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Доступные комнаты</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <VStack spacing={4}>
            <RadioGroup>
              <Stack direction="column">
              {props.rooms.slice(0, 20).filter(opt => opt.status === "Томск").map(room =>
                <Radio key={room.room_id} onClick={() => props.setSelectedRoom(room.room_id)}>{room.room_id}</Radio>
              )}

              </Stack>
            </RadioGroup>
          </VStack>
          <Table variant="simple">
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>inches</Td>
      <Td>millimetres (mm)</Td>
      <Td isNumeric>25.4</Td>
    </Tr>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
    </Tr>
    <Tr>
      <Td>yards</Td>
      <Td>metres (m)</Td>
      <Td isNumeric>0.91444</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot>
</Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button  colorScheme="blue" mr={3} type="submit">
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default FreeroomDialog;
