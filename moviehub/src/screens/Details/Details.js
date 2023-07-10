import { useParams } from 'react-router-dom';
import DetailsContent from "../../components/DetailsContent/DetailsContent";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import React from "react";

const Details = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <Header />
            <DetailsContent movieId={id} /> {/* Update prop name from `id` to `movieId` */}
            <Footer />
        </>
    );
}

export default Details;
