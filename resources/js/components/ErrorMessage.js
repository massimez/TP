import React, { useState } from 'react';
import { Box, Alert, AlertIcon, AlertDescription,CloseButton } from '@chakra-ui/react';
export default function ErrorMessage({ message }) {
    const [display,setDisplay] = useState(true)
  return (
    <Box my={4} display={display?"block":"none"}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription maxWidth="500">{message}</AlertDescription>
        <CloseButton position="absolute" onClick={()=>{setDisplay(!display)}} right="8px" top="8px" />
      </Alert>
    </Box>
  );
}
