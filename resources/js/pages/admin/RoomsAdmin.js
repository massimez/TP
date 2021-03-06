import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { PagiNext } from "../../components/PagiNext";
import { RoomsTable } from "./RoomsTable";
import Header from "../../components/layouts/Header";
import { Helmet } from 'react-helmet-async';

const RoomsAdmin = () => {
    const [rooms, setrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(20);
    const [Change, setChange] = useState("");

    useEffect(() => {
        const fetchrooms = async () => {
            setLoading(true);
            const res = await axios
                .get("/api/room")
                .then((ress) => {
                    setrooms(ress.data.rooms);
                    console.log(ress.data.rooms);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchrooms();
    }, [Change]);

    //Get current student index
    const indexOfLast = currentPage * roomsPerPage;
    const indexOfFirstPost = indexOfLast - roomsPerPage;
    const currrentrooms = rooms.sort(function (a, b) {
        return a.floor - b.floor;
    }).slice(indexOfFirstPost, indexOfLast);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <Helmet><title>Админ | Комнаты</title></Helmet>
            <Box mx="2%" mt={2}>
                <RoomsTable
                    rooms={currrentrooms}
                    loading={loading}
                    setChange={setChange}
                    Change={Change}
                />
                <PagiNext
                    postsPerPage={roomsPerPage}
                    totalPosts={rooms.length}
                    paginate={paginate}
                />
            </Box>
        </>
    );
};

export default RoomsAdmin;
