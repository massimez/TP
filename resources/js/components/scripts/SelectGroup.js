import React from "react";
import { useField } from "formik";
import { Select } from "@chakra-ui/select";

function SelectGroup(props) {
    const [field, meta] = useField(props);
    let groups = props.groups;
    return (
        <div>
            <Select
                textAlign="center"
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                {...field}
                width="450px"
                fontWeight="600"
                height="60px"
                backgroundColor="rgba(0,90,174,0.2)"
                color="white"
            >
                 { props.groups.map(group => (
            <option textAlign="center"  style={{color: "black"}} key={group.id} value={group.group_name} >{group.group_name}</option>
      ))}


            </Select>
        </div>
    );
}

export default SelectGroup;
