import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/layout";
import { PagiNext } from "../../components/PagiNext";
import { GroupsTable } from "./GroupsTable";
import Header from "../../components/layouts/Header";

const GroupAdmin = () => {
    const [group, setgroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [groupPerPage] = useState(20);
    const [Change, setChange] = useState("");

    useEffect(() => {
        const fetchgroup = async () => {
            setLoading(true);
            await axios
                .get("/api/group")
                .then((ress) => {
                    setgroup(ress.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchgroup();
    }, [Change]);

    //Get current student index
    const indexOfLast = currentPage * groupPerPage;
    const indexOfFirstPost = indexOfLast - groupPerPage;
    const currrentgroup = group.slice(indexOfFirstPost, indexOfLast);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <Box mx="2%" mt={2}>
                <GroupsTable
                    groups={currrentgroup}
                    loading={loading}
                    setChange={setChange}
                    Change={Change}
                />
                <PagiNext
                    postsPerPage={groupPerPage}
                    totalPosts={group.length}
                    paginate={paginate}
                />
            </Box>
        </>
    );
};

export default GroupAdmin;
