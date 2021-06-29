import Icon from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, HStack } from "@chakra-ui/layout";
import { background, VStack } from "@chakra-ui/react";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { FcLock } from "react-icons/fc";



const SquareFree = (props) => {
    const divStyle = {
        color: 'black',
        position: 'absolute',
        width: props.width/2 - 13,
        height:'5px',
        top: '115px',
        background:'rgba(0, 90, 174, 0.7)'
      };
      const divStyleLeft = {
        color: 'black',
        position: 'absolute',
        width: props.width/2 -13,
        height:'5px',
        top: '115px',
        left: props.width/2 + 5 ,
        background:'rgba(0, 90, 174, 0.7)'
      };
    return (
        <Flex
            width={props.width+"px"}
            height="124px"
            borderTop="4px"
            borderRight="4px"
            borderLeft="4px"
            borderColor="rgba(0, 90, 174, 0.7)"
            bg={props.bg}
            alignContent="center"
            justify="space-between"
            direction="column"
            p={0}
            m={0}
            position="relative"

        >
            {props.ass ? (
                <Icon my="auto" mx="auto" w={8} h={8} as={props.ass} />
            ) : (
                <Box align="center" >
                    {props.room.status === "Женская" &&
                    props.room.number_of_living >= 1 &&
                    props.room.number_of_living < props.room.max_living ? (
                        <FaFemale color="red"/>
                    ) : null}
                    {props.room.status === "Мужская" &&
                    props.room.number_of_living >= 1 &&
                    props.room.number_of_living <props.room.max_living ? (
                        <Box mt={1} color="facebook.500"><FaMale   /></Box>
                    ) : null}

                    {props.room.number_of_living === 0 || props.room.number_of_living === props.room.max_living ? (
                        <>
                        <HStack mt={1} justifyContent="space-between">
                           <Box  color="facebook.500" ><FaMale  /></Box>
                            <Box  ><FaFemale  color="red" /></Box>
                        </HStack>

                        </>
                    ) : null}

                </Box>
            )}

            {props.ass ? null : (
                <>
                    <Text fontWeight="normal" fontSize="xl" align="center" justifySelf="end">
                        {props.room.room_id}
                    </Text>
                    <VStack mx="auto" alignItems="center" pb="7px">
                    {props.room.number_of_living === 4 ?<Box m={1}><FcLock /> </Box> : <Text fontWeight="normal" fontSize="lg">
                            {props.room.number_of_living}/{props.room.max_living}
                        </Text>}
                    </VStack>
                </>
            )}
            <div  style={divStyle}></div>
            <div  style={divStyleLeft}></div>
        </Flex>
    );
};

export default SquareFree;
