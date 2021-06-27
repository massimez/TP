import { Box } from "@chakra-ui/layout";
import React, {  useState, useEffect } from "react";
import SquareRoom from "./SquareRoom";
import axios from 'axios'
import { Flex, VStack,Icon } from "@chakra-ui/react";
import {HiPlusCircle , HiMinusCircle} from "react-icons/hi"

const RoomsPlan = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [width, setWidth] = useState(70);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get("/api/room").catch((err) => {
                console.log(err);
            });
            setRooms(res.data.rooms);
            setLoading(false);
        };
        fetchPosts();
    }, []);
    return (
        <Box  width="95%" pb={3} bg="white" mx="auto" borderRadius="2%">
         <SquareRoom width={width} rooms={rooms} />
         <VStack align="flex-end" mt={20}>
             <Icon as={HiPlusCircle}
             onClick={()=>{
                 setWidth(width+20)
             }} color="facebook.500" width="40px" height="40px"/>
             <Icon onClick={()=>{
                 setWidth(width-20)
             }} as={HiMinusCircle} color="facebook.500" width="40px" height="40px"  />
         </VStack>
        </Box>
    );
};

export default RoomsPlan;
