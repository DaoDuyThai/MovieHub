import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [newSeries, setNewSeries] = useState([]);

    //get today date format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;


    //api key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    //get popular movies
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc', options)
            .then(response => response.json())
            .then(data => setPopularMovies(data.results))
            .catch(err => console.error(err));

    }, []);

    //get new movies
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US%2C%20vi-VN&page=5&primary_release_date.lte=${today}&sort_by=primary_release_date.desc&with_origin_country=US`, options)
            .then(response => response.json())
            .then(data => setNewMovies(data.results))
            .catch(err => console.error(err));

    }, []);

    //get new series
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?air_date.lte=${today}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=10&sort_by=primary_release_date.desc&with_origin_country=US`, options)
            .then(response => response.json())
            .then(data => setNewSeries(data.results))
            .catch(err => console.error(err));
    }, []);


    //carousel responsive
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="container-fluid">
            {/* searchbox start */}
            <div class="search-box">
                <form action="https://mentoring.dreamguystech.com/html/template/search.html">
                    <div class="form-group search-info">
                        <input type="text" class="form-control"
                            placeholder="Search movie names, genre, actor, etc"></input>
                    </div>
                    <button type="submit" class="btn btn-primary search-btn"><i></i> <span>Search</span></button>
                </form>
            </div>
            {/* searchbox end */}


            {/* Popular Movies start */}
            <section class="section popular-courses">
                <div class="container">
                    <div class="section-header text-center aos" data-aos="fade-up">
                        <h2>Popular Movies</h2>
                    </div>
                    {/* popular movies carousel start    */}
                    <Carousel responsive={responsive}>
                        {popularMovies.map((movie) => (
                            <div data-aos="fade-up" style={{ scale: "80%" }}>
                                <div class="movie">
                                    <div class="movie-img" >
                                        <a href="profile.html">
                                            <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} ></img>
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
                        ))}
                    </Carousel>
                    {/* popular movies carousel end  */}
                    {/* Popular Movies end * */}


                    <div class="section-header text-center aos" data-aos="fade-up">
                        <h2>New Movies</h2>
                    </div>

                    {/* New Movies start */}
                    <Row>
                        {newMovies.map((movie) => (
                            <Col md={3}>

                                <div data-aos="fade-up" style={{ scale: "80%" }}>
                                    <div class="movie">
                                        <div class="movie-img" >
                                            <a href="profile.html">
                                                <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} ></img>
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
                        ))}
                    </Row>
                    {/* New Movies end */}


                    <div class="section-header text-center aos" data-aos="fade-up">
                        <h2>New Series</h2>
                    </div>


                    {/* New series start */}
                    <Row>
                        {newSeries.map((movie) => (
                            <Col md={3}>

                                <div data-aos="fade-up" style={{ scale: "80%" }}>
                                    <div class="movie">
                                        <div class="movie-img" >
                                            <a href="profile.html">
                                                <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} ></img>
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
                            ))}
                    </Row>


                    {/* New series end */}




                </div>
            </section>
        </div>

    );
}
export default Home;