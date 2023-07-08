import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import HomeContent from '../../components/HomeContent/HomeContent';
import Header from '../../components/Header/Header';

const Home = () => {


    return (
        <>
            <Header />
            <HomeContent />
        </>

    );
}
export default Home;