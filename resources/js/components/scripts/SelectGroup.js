import React from "react";
import { useField } from "formik";
import { Select } from "@chakra-ui/select";

function SelectGroup(props) {
    const [field, meta] = useField(props);
    let groups = props.groups;
    return (
        <div>
            <Select
                id={props.name}
                textAlign="center"
                style={{textAlignLast:"center"}}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                {...field}
                width={[250, 400, 450]}
                fontWeight="600"
                height="60px"
                backgroundColor="rgba(0,90,174,0.2)"
                color="#8B8B8B"
                onClick={() => {
                document.getElementById(props.name).style.color='black';   }}
            >
                 { props.groups.map(group => (
            <option   style={{color: "black"}} key={group.id} value={group.group_name?group.group_name:group.status_student} >{group.group_name?group.group_name:group.status_student}</option>
      ))}


            </Select>
        </div>
    );
}

export default SelectGroup;
