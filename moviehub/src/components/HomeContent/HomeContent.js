import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './HomeContent.css';
import { Link } from 'react-router-dom';

const HomeContent = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [newSeries, setNewSeries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        fetch(`https://api.themoviedb.org/3/discover/tv?air_date.lte=${today}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=9&sort_by=primary_release_date.desc&with_origin_country=US`, options)
            .then(response => response.json())
            .then(data => setNewSeries(data.results))
            .catch(err => console.error(err));
    }, []);


    //carousel responsive
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 9
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            window.location.href = `/search/${searchQuery}`;
        }
    };



    return (
        <div className="container-fluid home-content-container" id='container'>

            {/* search start */}
            <div className='search-container'>
                <h1 style={{ fontWeight: 'bold' }}>Welcome to Movie<span className='text-warning'>Hub</span></h1>
                <h3 style={{ fontWeight: 'bold' }}>Millions of movies, TV shows and people to discover. Explore now.</h3>
                <br></br>
                <form className="form" style={{ width: '80%' }} onSubmit={handleSearch}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            style={{ backgroundColor: '#0e1f23', color: 'white' }}
                            placeholder="Search for movies, series, episodes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button type='submit' className="btn btn-warning">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* search end  */}




            {/* Popular Movies start */}
            <section class="section popular-courses" style={{ marginTop: "30px" }}>
                <div class="container">
                    <div class="section-header aos" data-aos="fade-up">
                        <h2 className='text-warning'>Trending Movies</h2>
                    </div>
                    {/* popular movies carousel start */}
                    <Carousel responsive={responsive}>
                        {
                            popularMovies.map((movie) => (
                                <div data-aos="fade-up" style={{ scale: "90%" }} >
                                    <div class="movie">
                                        <div class="movie-img" >
                                            <Link to={`/details/${movie.id}`}>
                                                <img class="img-fluid" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onError={(e) => {
                                                    e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                                }}></img>
                                            </Link>
                                        </div>
                                        <div class="top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <h5 class="text-warning">
                                                <Link class="text-warning" to={`/details/${movie.id}`}>{movie.original_title}</Link>
                                            </h5>
                                        </div>
                                        <div class="bottom">
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyleType: "none" }}>
                                                <div><i class="far fa-clock"></i> {movie.release_date}</div>
                                                <span class="rating text-warning"><i class="fas fa-thumbs-up"></i> {movie.vote_average}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                    {/* popular movies carousel end  */}
                    {/* Popular Movies end * */}

                    <br></br>
                    <div class="section-header aos" data-aos="fade-up">
                        <h2 className='text-warning'>New Movies</h2>
                    </div>

                    {/* New Movies start */}
                    <Row className='newMovie'>
                        {newMovies.map((movie) => (
                            <Col md={3}>

                                <div data-aos="fade-up" style={{ scale: "90%" }} >
                                    <div class="movie">
                                        <div class="movie-img" >
                                            <Link to={`/details/${movie.id}`}>
                                                <img class="img-fluid" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onError={(e) => {
                                                    e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                                }}></img>
                                            </Link>
                                        </div>
                                        <div class="top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <h5 class="text-warning">
                                                <Link class="text-warning" to={`/details/${movie.id}`}>{movie.original_title}</Link>
                                            </h5>
                                        </div>
                                        <div class="bottom">
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyleType: "none" }}>
                                                <div><i class="far fa-clock"></i> {movie.release_date}</div>
                                                <span class="rating text-warning"><i class="fas fa-thumbs-up"></i> {movie.vote_average}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Col>
                        ))}
                    </Row>
                    {/* New Movies end */}





                    {/* New series start */}
                    <br></br>
                    <div class="section-header aos" data-aos="fade-up">
                        <h2 className='text-warning'>New TV Shows</h2>
                    </div>
                    <Row>
                        {newSeries.map((movie) => (
                            <Col md={4}>

                                <div data-aos="fade-up" style={{ scale: "90%" }} >
                                    <div class="movie">
                                        <div class="movie-img" >
                                            <Link to={`/details/${movie.id}`}>
                                                <img class="img-fluid" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onError={(e) => {
                                                    e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                                }}></img>
                                            </Link>
                                        </div>
                                        <div class="top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <h5 class="text-warning">
                                                <Link class="text-warning" to={`/details/${movie.id}`}>{movie.original_title}</Link>
                                            </h5>
                                        </div>
                                        <div class="bottom">
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyleType: "none" }}>
                                                <div><i class="far fa-clock"></i> {movie.release_date}</div>
                                                <span class="rating text-warning"><i class="fas fa-thumbs-up"></i> {movie.vote_average}</span>
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
export default HomeContent;