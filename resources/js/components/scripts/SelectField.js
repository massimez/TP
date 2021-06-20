import React from "react";
import { useField } from "formik";
import { Select } from "@chakra-ui/select";

function SelectField({ setSex, ...props }) {
    const [field, meta] = useField(props);
    return (
        <Select
            id="myselect"
            textAlign="center"
            style={{textAlignLast:"center"}}
            {...props}
            {...field}
            width={[250, 400, 450]}
            fontWeight="600"
            height="60px"
            backgroundColor="rgba(0,90,174,0.2)"
            color="white"
            onChange={(event) => {setSex(event.currentTarget.value)
                document.getElementById('myselect').style.color='black';   }}
        >
            <option style={{ color: "blue" }} value="МУЖСКОЙ">
                МУЖСКОЙ
            </option>
            <option style={{ color: "red" }} value="ЖЕНСКИЙ">
                ЖЕНСКИЙ
            </option>
        </Select>
    );
}

export default SelectField;
