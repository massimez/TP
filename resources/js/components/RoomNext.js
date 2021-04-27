import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import React from 'react'


const RoomNext = (props) => {
    let maxValue = Math.max.apply(null,
        props.rooms.rooms.map(function(o) { return o.floor; }));
    console.log(maxValue)

    const toloop = () => {
            let loop = [];
            for (let i = 1; i < maxValue; i++) {
              loop.push(<Button  key={i}  colorScheme="blue" size="sm" onClick={() => props.setFloorPage(i)}>
                {i}
            </Button>)

            }
            return  loop ;

    }
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
        borderBottom="1px" borderColor="whiteAlpha.400"
      >

    {toloop()}

        </Flex>
    )
}

export default RoomNext
