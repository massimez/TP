import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { UsersTable } from "../../components/UsersTable";
import { PagiNext } from "../../components/PagiNext";
import Header from "../../components/layouts/Header";
import { Helmet } from 'react-helmet-async';

const Users = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [Change, setChange] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios
                .get("/api/admin")
                .then((ress) => {
                    setPosts(ress.data.users);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchPosts();
    }, [Change]);

    //Get current student index
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLast - postsPerPage;
    const currrentPosts = posts.slice(indexOfFirstPost, indexOfLast);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <Helmet><title>Админ | Пользователи</title></Helmet>
            <Box mx="2%" mt={2}>
                <UsersTable
                    users={currrentPosts}
                    loading={loading}
                    setChange={setChange}
                    Change={Change}
                />
                <PagiNext
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </Box>
        </>
    );
};

export default Users;
