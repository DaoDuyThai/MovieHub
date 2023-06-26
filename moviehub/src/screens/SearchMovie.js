import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const SearchMovie = () => {
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    //api key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    //get Movies
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=John&sort_by=popularity.desc&api_key=a539253d68cc8301f16813bcfb9da119`, options)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error(err));
    }, []);


    return (
        <>
            <Container>


                <Row>
                    <Col md={2}>Hello</Col>
                    <Col md={10}>
                        <Row>
                            {
                                movies.map((movie) => (
                                    <Col md={3} key={movie.id}>
                                        <div data-aos="fade-up" style={{ scale: "90%" }}>
                                            <div class="movie">
                                                <div class="movie-img" >
                                                    <a href="profile.html">
                                                        <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                            onError={(e) => {
                                                                e.target.src = 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' // some replacement image
                                                            }} ></img>


                                                    </a>
                                                </div>
                                                <div class="movie-content">
                                                    <h3 class="title"><a href="profile.html">{movie.original_title}</a></h3>
                                                    <div class="author-info">
                                                        <div class="author-name">
                                                            IMDB: {movie.vote_average}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                ))
                            }
                        </Row>


                    </Col>
                </Row>

            </Container>

        </>
    );
}
export default SearchMovie;