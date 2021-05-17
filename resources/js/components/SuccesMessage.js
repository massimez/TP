import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription,CloseButton } from '@chakra-ui/react';
export default function SuccesMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="success" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
        <CloseButton position="absolute" right="10px" top="8px"/>
      </Alert>
    </Box>
  );
}
