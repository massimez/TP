import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
export default function SuccesMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="success" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
