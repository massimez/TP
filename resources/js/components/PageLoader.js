import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

 const PageLoader = () => {
    return (
        <Flex
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      top={0}
      alignItems="center"
      justifyContent="center"
      bg="white"
      zIndex={999}
    >
      <Spinner thickness="8px" color="gray.400" />
    </Flex>
    )
}
export default PageLoader;
