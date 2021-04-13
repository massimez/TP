import {
  Box,
  IconButton,
  Image,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import { FaSun, FaMoon ,FaUserCircle} from "react-icons/fa";
import {FiHelpCircle} from "react-icons/fi"
import Colormode from "./Colormode";
import {AiFillSetting} from "react-icons/ai"
import { Link } from "react-router-dom";
import logo from '../../../../public/images/logo.png';


function Header(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="white"
      alignItems="center"
      p="8"
      borderBottom="1px" borderColor="whiteAlpha.400"
      mb="8"
    >
      <Link to="/app/">
        <Image
        src={logo}
        alt="Tusur logo" w="380px" h="39.22px"
      />
      </Link>

      <Heading as="h3" size="md">{props.title}</Heading>

      <Menu isLazy  alignSelf="flex-end" mx="max" size="sm" closeOnSelect={true} closeOnBlur={true} placement="right-start" >
        <MenuButton
          _hover={{ color: "blue.900", stroke: "red" }}
          _focus={{ boxShadow: "outline" }}
          as={IconButton}
          color="currentColor"
          aria-label="Options"
          icon={<FaUserCircle size="lg"/>}
          variant="none"
          w="1"
          isRound="true"
        />
        <MenuList color="black">
          <MenuItem icon={<FaUserCircle />} command="⌘T">
            Профиль
          </MenuItem>
          <MenuItem icon={<AiFillSetting />} command="⌘N">
            Настройки
          </MenuItem>
          <MenuItem icon={<FiHelpCircle />} command="⌘⇧N">
            Помощь
          </MenuItem>
          <MenuItem icon={<FaUserCircle />} command="⌘O">
          <a href="logout" onClick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        Logout
                                    </a>
  <form id="logout-form" action="/logout" method="POST" class="d-none">

            </form>
          </MenuItem>
          <Colormode />
        </MenuList>
      </Menu>
    </Flex>
  );
}


export default Header;
