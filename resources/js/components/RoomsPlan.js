import { Box } from "@chakra-ui/layout";
import React, {  useState, useEffect } from "react";
import SquareRoom from "./SquareRoom";
import axios from 'axios'

const RoomsPlan = () => {
    const [rooms, setRooms] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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
        <Box  width="95%" bg="white" mx="auto" borderRadius="2%">
        <SquareRoom  rooms={rooms} />
        </Box>
    );
};

export default RoomsPlan;
