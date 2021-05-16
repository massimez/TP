import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
export default function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription maxWidth="500">{message}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </Box>
  );
}
