import { Button } from "@chakra-ui/button";
import { Flex, Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import FreeRoomsDialog from "./FreeRoomsDialog";

const RoomNext = (props) => {
    const [showEtage, setShowEtage] = useState(false);
    const [showEtageCenter, setShowEtageCenter] = useState(false);
    let maxValue = Math.max.apply(
        null,
        props.rooms.map(function (o) {
            return o.floor;
        })
    );

    const toloop = () => {
        let loop = [];
        for (let i = 1; i < maxValue + 1; i++) {
            loop.push(
                <Button
                    key={i}
                    _focus={{
                        bg: "teal.600",
                        color: "white",
                        borderColor: "teal.600",
                        boxShadow: "outline",
                    }}
                    mt={4}
                    mb={1}
                    mr={1}
                    colorScheme="facebook"
                    size={props.size}
                    onClick={() => {
                        props.setFloorPage(i);
                        setShowEtage(!showEtage);
                        setShowEtageCenter(true);
                    }}
                >
                    {i}
                </Button>
            );
        }
        return loop;
    };
    let i = 0;
    return (
        <Box mt={5} mb={2}>
            <Flex
                w="95%"
                mx="auto"
                as="nav"
                justify={showEtageCenter ? "center" : "flex-start"}
                wrap="wrap"
                color="white"
                spacinig="5"
                alignItems="center"
                borderBottom="1px"
                borderColor="whiteAlpha.400"
            >
            <Button
                    rightIcon={<ImArrowRight2 />}
                    _focus={{
                        bg: "teal.600",
                        color: "white",
                        borderColor: "teal.600",
                        boxShadow: "outline",
                    }}
                    width="176px"
                    colorScheme="facebook"
                    size={props.size}
                    mt={4}
                    mb={1}
                    mr={1}
                    onClick={() => {
                        setShowEtageCenter(false);
                        setShowEtage(!showEtage);
                    }}
                >
                    {showEtage ? "Этажи   " : "Этаж " + props.floorActive}
                </Button>
                {showEtage ? toloop() : props.showList? <Box ml="auto"><FreeRoomsDialog ml="auto" floorActive={props.floorActive} size={props.size} /></Box>: null}



            </Flex>
        </Box>
    );
};

export default RoomNext;
