import React from 'react'
import Header from '../components/layouts/Header'
import { Helmet } from 'react-helmet-async';

function Error404() {
    return (
        <div>
             <Helmet><title>404</title></Helmet>
            <Header />
            <h1>Error 404</h1>
        </div>
    )
}

export default Error404
