import React, { useState, useEffect } from "react";
import axios from "axios";
import { Students } from "../StudentsTable";
import { PagiNext } from "../PagiNext";
import { Box } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { setResidents } from "../../store/actions/studentAction";
import Filtermenu from "../Filtermenu";

const Pagnation = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const dispatch = useDispatch();
    let residents = useSelector((state) => state.residents.residents);
    console.log(residents)
    const filter  = useSelector(state => state.residents.filter )
    const [rerenderChange,setRerenderChange] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get("/api/student").catch((err) => {
                console.log(err);
            });
            //setPosts(res.data);
            dispatch(setResidents(res.data));
            setLoading(false);
        };
        fetchPosts();
    }, [rerenderChange]);

    const search = (residents) => {
        const FIO = filter.FamilyName;
        const name = filter.Name;
        const citizenship = filter.citizenship;
        const sex = filter.sex;
        const groupe = filter.groupe;
        const status_accommodation = filter.statusAccommodation;
        console.log(FIO)
        return residents.filter((row)=>  row.surname.toString().toLowerCase().indexOf(FIO.toLowerCase()) > -1
        && row.name.toString().toLowerCase().indexOf(name.toLowerCase()) > -1
         && row.citizenship.toString().toLowerCase().indexOf(citizenship.toLowerCase()) > -1
         &&  row.sex.toString().toLowerCase().indexOf(sex.toLowerCase()) > -1
         &&  row.status_accommodation.toString().toLowerCase().indexOf(status_accommodation.toLowerCase()) > -1
         && row.group.toString().toLowerCase().indexOf(groupe.toLowerCase()) > -1
         );}
    if(filter.isFiltred) {
         console.log(filter?filter:"Undi");
         residents = search(residents);
    }

    //Get current student index
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLast - postsPerPage;
    const currrentPosts = residents.slice(indexOfFirstPost, indexOfLast);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Box>
            <Filtermenu/>
            <Students posts={currrentPosts} loading={loading} setRerenderChange={setRerenderChange} />
            <PagiNext
                postsPerPage={postsPerPage}
                totalPosts={residents.length}
                paginate={paginate}
            />
        </Box>
    );
};

export default Pagnation;
