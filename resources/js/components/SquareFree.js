import Icon from '@chakra-ui/icon'
import { Box } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/layout'
import React from 'react'

const SquareFree = (props) => {

    return (

            <Flex
                    width="40px"
                    height="80px"
                    border="2px"
                    bg="orange"
                    alignContent="center"
                    justifyContent="center"
                    direction="column"
                >
                    <Box align="center">

                        <Icon as={props.ass} />
                    </Box>
                </Flex>

    )
}

export default SquareFree
