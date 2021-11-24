import React from "react";
import { Flex } from "@chakra-ui/layout";
const SquareIcon = (props) => {
    const divStyle = {
        color: 'black',
        position: 'absolute',
        width: props.width/2 - 13,
        height:'5px',
        bottom: props.left ?0: '115px' ,
        top : props.left ? '115px':0,
        left: 0 ,
        background:'rgba(0, 90, 174, 0.7)'
      };
      const divStyleLeft = {
        color: 'black',
        position: 'absolute',
        width: props.width/2 -13,
        height:'5px',
        bottom: props.left ?0: '115px' ,
        top : props.left ? '115px':0,
        left: props.width/2 + 5 ,
        background:'rgba(0, 90, 174, 0.7)'
      };
    return (
        <Flex
            width={props.width + "px"}
            height="124px"
            borderBottom={props.left ? 0: "4px"}
            borderTop={props.left ? "4px": "0"}
            borderRight="4px"
            borderLeft="4px"
            borderColor="rgba(0, 90, 174, 0.7)"
            bg={props.bg}
            align="center"
            alignContent="center"
            justify="center"
            p={0}
            m={0}
            position="relative"
        >
            <div style={divStyle}></div>
            <div style={divStyleLeft}></div>
            <img width="25px" height="25px" src={props.icon}  />
        </Flex>
    );
};

export default SquareIcon;
