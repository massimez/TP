import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import React from "react";
import { useField } from "formik";
import { Box } from "@chakra-ui/layout";

export const Textfield = ({  ...props }) => {
    const [field, meta] = useField(props);
    //console.log(field);
    return (
        <Box>
            <InputGroup>
                <Input name={props.name} isRequired={props.isRequired} width="450px" height="60px"
                fontWeight="600"
                color="black" bg="#005aae" opacity="20%"
                borderRadius="6%"
                type={props.type}
                textAlign="center"
                value={props.value}
                placeholder={props.placeholder}  {...field}  _placeholder={{ color: "white" }} />

            </InputGroup>

        </Box>
    );
};
