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
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import Colormode from "./Colormode";
import { AiFillSetting } from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../../public/images/logo.png";
import cookie from "js-cookie";
import { useState } from "react";
import UserProfil from "../UserProfil";

function Header(props) {
    const [Logout, setLogout] = useState(props.loggedIn);

    const HandleLogout = (e) => {
        e.preventDefault();
        cookie.remove("token");
        props.logout();
    };
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            color="white"
            alignItems="center"
            p="8"
            borderBottom="1px"
            borderColor="whiteAlpha.400"
            mb="8"
        >
            <Link to="/app/">
                <Image
                    src={logo}
                    alt="Tusur logo"
                    w={["200px", "200px", "200px", "380px", "380px"]}
                    h="39.22px"
                />
            </Link>

            <Heading as="h3" size="md">
                {props.title}
            </Heading>

            <Menu
                isLazy
                alignSelf="flex-end"
                mx="max"
                size="sm"
                closeOnSelect={false}
                closeOnBlur={false}
                placement="right-start"
            >
                <MenuButton
                    _hover={{ color: "blue.900", stroke: "red" }}
                    _focus={{ boxShadow: "outline" }}
                    as={IconButton}
                    color="currentColor"
                    aria-label="Options"
                    icon={<FaUserCircle size="lg" />}
                    variant="none"
                    w="1"
                    isRound="true"
                />
                <MenuList color="black">
                    {props.loggedIn ? (
                        <>
                            <UserProfil />
                            {props.role === "admin" ? (
                                <Link to="/admin/">
                                    {" "}
                                    <MenuItem
                                        icon={<AiFillSetting />}
                                        command="???O"
                                    >
                                        ??????????????????????????
                                    </MenuItem>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            <Tooltip
                                label="???????? ?????? ?????????? ????????????, ???????????????? admin@admin.ru"
                                fontSize="md"
                            >
                                <MenuItem icon={<FiHelpCircle />} command="??????N">
                                    ????????????
                                </MenuItem>
                            </Tooltip>
                            <MenuItem
                                icon={<FaSignOutAlt />}
                                onClick={HandleLogout}
                                command="???O"
                            >
                                <Text color="red">??????????</Text>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <Link to="/login/">
                                {" "}
                                <MenuItem icon={<FaUserCircle />} command="???O">
                                    ??????????????????????
                                </MenuItem>
                            </Link>
                            <Link to="/register/">
                                {" "}
                                <MenuItem icon={<FaUserCircle />} command="???O">
                                    ??????????????????????
                                </MenuItem>
                                <Tooltip
                                    label="???????? ?????? ?????????? ????????????, ???????????????? admin@admin.ru"
                                    fontSize="md"
                                >
                                    <MenuItem
                                        icon={<FiHelpCircle />}
                                        command="??????N"
                                    >
                                        ????????????
                                    </MenuItem>
                                </Tooltip>
                            </Link>
                        </>
                    )}

                    {/* <Colormode /> */}
                </MenuList>
            </Menu>
        </Flex>
    );
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        role: state.auth.user.role,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: "SET_LOGOUT" }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
