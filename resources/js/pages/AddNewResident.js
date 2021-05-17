import React from 'react'
import Header from '../components/layouts/Header'
import FormResident from '../components/FormResident'
import { Helmet } from 'react-helmet-async';

function AddNewStudent() {
    return (
        <div>
        <Helmet><title>Новый студент</title></Helmet>
         <Header title="Новый студент"/>
         <FormResident />
        </div>

    )
}

export default AddNewStudent
