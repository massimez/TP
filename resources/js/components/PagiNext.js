import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import React, { useState } from 'react'

export const PagiNext = ({postsPerPage,totalPosts,paginate}) => {
   const pageNumbers = [];
   let i = 1;
   for(; i <= (totalPosts / postsPerPage )+1;i++){
       pageNumbers.push(i);
   }
   const [selectedPage,setSelectedPage]=useState(1)

    return (
        <Flex
        mt={2}
        bg="gray.100"
        as="nav"
        align="center"
        justify="center"
        alignItems="center"
        borderBottom="1px" borderColor="whiteAlpha.400"
        borderRadius="16px"
      >
      <Button colorScheme="white" color="rgba(161,161,161)"  _hover={{bg:"blue.300"}}  _focus={{bg:"rgba(0,90,174,0.4)"}} size="md" onClick={() => paginate(1)}>&lt;&lt;</Button>

                {pageNumbers.map(number => (

                      <Button size="md" key={number} color="rgba(161,161,161)" _focus={{bg:"rgba(0,90,174,0.4)"}} _hover={{bg:"blue.300"}} colorScheme="white"  onClick={() => {
                           paginate(number)
                           setSelectedPage(number)
                           }
                      }
                     >
                            {number}
                        </Button>
                ))}

                <Button size="md"_hover={{bg:"blue.300"}} _focus={{bg:"rgba(0,90,174,0.4)"}} colorScheme="white" color="rgba(161,161,161)" onClick={() => paginate(i-1)}>&gt;&gt;</Button>
        </Flex>
    )
}
