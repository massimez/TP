import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/input";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useField } from "formik";
import { Box } from "@chakra-ui/layout";
import { ErrorMessage as Ferrmsg } from "formik";
import { Button,Text } from "@chakra-ui/react";
import { MdDateRange } from "react-icons/md";
export const Textfield = ({ ...props }) => {
    const [field, meta] = useField(props);
    const [type, settype] = useState(props.type)
    const [showPlaceHolder, setShowPlaceHolder] = useState(false)
    //console.log(field);
    return (
        <Box>
            {showPlaceHolder && <Text color="#8B8B8B" fontWeight="600" mb="2px">{props.placeholder}</Text>}
            <InputGroup>
                <Input
                    name={props.name}
                    isRequired={props.isRequired}
                    width={[250, 400, 450]}
                    height="60px"
                    fontWeight="600"
                    color="#8B8B8B"
                    backgroundColor="rgba(0,90,174,0.2)"
                    borderRadius="6%"
                    type={type}
                    textAlign="center"
                    value={props.value}
                    _focus={{ color: "black" }}
                    onMouseEnter={(e) => {
                        props.showIconDate == "true"? settype("date") :null
                    }}
                    onFocus={() => {
                        setShowPlaceHolder(true);
                    }}
                    _visited={{ color: "black" }}
                    step={props.step}
                    placeholder={props.placeholder}
                    {...field}
                    _placeholder={{ color: "#8B8B8B" }}
                />
                {meta.touched && meta.error && (
                    <WarningIcon w={6} h={6} color="red.500" />
                )}

                {props.showIconDate == "true" && type !== "date" ? (
                    <InputRightElement width="3rem" ml="40px" mt="5px">
                        <Button type="button" colorScheme="rgba(0,90,174,0.2)">
                            {" "}
                            <MdDateRange color="#8B8B8B" />{" "}
                        </Button>
                    </InputRightElement>
                ) : null}
            </InputGroup>
            <Box maxWidth="300px">
                <Ferrmsg
                    component="div"
                    style={{ color: "red" }}
                    name={field.name}
                />
            </Box>
        </Box>
    );
};
