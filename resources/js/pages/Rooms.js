import React from 'react'
import Header from '../components/layouts/Header'
import RoomsPlan from '../components/RoomsPlan'
import { Helmet } from 'react-helmet-async';

function Rooms() {
    return (
        <div>
            <Helmet><title>Комнаты</title></Helmet>
            <Header title="Rooms"/>
            <RoomsPlan />
        </div>
    )
}

export default Rooms
