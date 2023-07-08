import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PlayerContent from "../../components/PlayerContent/PlayerContent";
import React from "react";
import { useParams } from 'react-router-dom';


const Player = () => {
    const { id } = useParams();
    return (
        <>
            <Header />
            <PlayerContent movieId={id} />
            <Footer />
        </>
    );
}
export default Player;