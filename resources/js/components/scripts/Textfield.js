import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import React from "react";
import { useField } from "formik";
import { Box  } from "@chakra-ui/layout";
import { ErrorMessage as Ferrmsg }  from "formik";

export const Textfield = ({  ...props }) => {
    const [field, meta] = useField(props);
    //console.log(field);
    return (
        <Box>
            <InputGroup>
                <Input name={props.name} isRequired={props.isRequired} width="450px" height="60px"
                fontWeight="600"
                color="black" backgroundColor="rgba(0,90,174,0.2)"
                borderRadius="6%"
                type={props.type}
                textAlign="center"
                value={props.value}
                placeholder={props.placeholder}  {...field}  _placeholder={{ color: "white" }} />
                {meta.touched && meta.error &&  <WarningIcon w={6} h={6} color="red.500" />}
            </InputGroup>
            <Ferrmsg component="div" style={{color:'red'}} name={field.name} />

        </Box>
    );
};
