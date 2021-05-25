import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React,{useState} from "react";

const RoomNext = (props) => {
    const [showEtage, setShowEtage] = useState(true)
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
                    colorScheme="blue"
                    size={props.size}
                    onClick={() => props.setFloorPage(i)}
                >
                    {i}
                </Button>
            );
        }
        return loop;
    };
    let i = 0;
    return (
        <Flex
            as="nav"
            align="center"
            justify="center"
            wrap="wrap"
            color="white"
            spacinig="5"
            alignItems="center"
            borderBottom="1px"
            borderColor="whiteAlpha.400"
        >
        <Button
            _focus={{
                        bg: "teal.600",
                        color: "white",
                        borderColor: "teal.600",
                        boxShadow: "outline",
                    }}
                    colorScheme="blue"
                    size={props.size}
            onClick={()=>{
            setShowEtage(!showEtage)
        }}>Этажи</Button>
            {showEtage?toloop():null}
        </Flex>
    );
};

export default RoomNext;
