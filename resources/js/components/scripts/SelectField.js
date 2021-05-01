import React from "react";
import { useField } from "formik";
import { Select } from "@chakra-ui/select";


function SelectField({ ...props }) {
    const [field, meta] = useField(props);
    return (
      <div>
  <Select   textAlign="center" {...props} {...field}  width="450px"fontWeight="600" height="60px" bg="bluet.900" opacity="20%" color="white" >
  <option   style={{color: "blue"}}  value="МУЖСКОЙ">МУЖСКОЙ</option>
<option  style={{color: "red"}} value="ЖЕНСКИЙ">ЖЕНСКИЙ</option>
  </Select>
      </div>


    );
}

export default SelectField;


