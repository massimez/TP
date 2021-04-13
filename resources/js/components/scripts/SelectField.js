import React from "react";
import { useField } from "formik";
import { Select } from "@chakra-ui/select";

function SelectField({ ...props }) {
    const [field, meta] = useField(props);
    return (

            <Select {...props} {...field}  width="450px"fontWeight="600" height="60px" bg="bluet.900" opacity="20%" color="white" >
                <option  color="black" value="option1">Муж</option>
                <option  value="option2">Жен</option>
            </Select>

    );
}

export default SelectField;
