import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import React from 'react'

export const PagiNext = ({postsPerPage,totalPosts,paginate}) => {
   const pageNumbers = [];
   for(let i = 1; i <= (totalPosts / postsPerPage )+1;i++){
       pageNumbers.push(i);
   }
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
                {pageNumbers.map(number => (

                      <Button  key={number}  colorScheme="blue" size="sm" onClick={() => paginate(number)}>
                            {number}
                        </Button>
                ))}
        </Flex>
    )
}
