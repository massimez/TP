import React, { Component } from 'react'
import { Box,
    IconButton,
    Image,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    Button} from "@chakra-ui/react";
import { FaSun, FaMoon ,FaUserCircle} from "react-icons/fa";
import {FiFilter} from "react-icons/fi";

export class Filtermenu extends Component {
    render() {
        return (
          
            <div>
                <Menu  isLazy  alignSelf="flex-end" mx="max" size="sm" closeOnSelect={true} closeOnBlur={true} placement="right-start" >
        <MenuButton 
          leftIcon={<FiFilter/>}
          _hover={{ color: "black.900", stroke: "red" }}
          _focus={{ boxShadow: "outline" }}
          as={Button}
          bg="whiteAlpha.400"
          color="currentColor"
          aria-label="Options"
          variant="none" 
        >Filter</MenuButton>
        <MenuList color="black">
          <MenuItem icon={<FaUserCircle />} command="⌘T">
            New Tab
          </MenuItem>
          <MenuItem icon={<FaUserCircle />} command="⌘N">
            New Window
          </MenuItem>
          <MenuItem icon={<FaUserCircle />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<FaUserCircle />} command="⌘O">
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
            </div>
        )
    }
}

export default Filtermenu
