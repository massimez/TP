import Icon from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, HStack } from "@chakra-ui/layout";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { FcLock } from "react-icons/fc";

const SquareFree = (props) => {
    return (
        <Flex
            width="72px"
            height="124px"
            border="5px solid rgba(0, 90, 174, 0.7)"
            bg={props.bg}
            alignContent="center"
            justify="space-between"
            direction="column"
            p={0}
            m={0}
        >
            {props.ass ? (
                <Icon my="auto" mx="auto" w={8} h={8} as={props.ass} />
            ) : (
                <Box align="center">
                    {props.room.status === "Женская" &&
                    props.room.number_of_living >= 1 &&
                    props.room.number_of_living <= 4 ? (
                        <FaFemale color="red"/>
                    ) : null}
                    {props.room.status === "Мужская" &&
                    props.room.number_of_living >= 1 &&
                    props.room.number_of_living <= 4 ? (
                        <FaMale  />
                    ) : null}

                    {props.room.number_of_living === 0 ? (
                        <>
                            <FaMale />
                            <FaFemale />
                        </>
                    ) : null}
                </Box>
            )}

            {props.ass ? null : (
                <>
                    <Text fontWeight="bold" fontSize="xl" align="center" justifySelf="end">
                        {props.room.room_id}
                    </Text>
                    <Flex mx="auto" alignItems="center">
                        <Text fontWeight="bold" fontSize="lg">
                            {props.room.number_of_living}/4
                        </Text>
                        {props.room.number_of_living === 4 ? <FcLock /> : null}
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default SquareFree;
