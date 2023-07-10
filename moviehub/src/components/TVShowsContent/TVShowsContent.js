import { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './TVShowsContent.css';
import { Link } from 'react-router-dom';

const TVShowsContent = () => {
    //get set trending movies
    const [popularMovies, setPopularMovies] = useState([]);
    //get set new movies
    const [newMovies, setNewMovies] = useState([]);
    //get set new serires
    const [newSeries, setNewSeries] = useState([]);
    //get set search query
    const [searchQuery, setSearchQuery] = useState('');
    //get set page
    const [page, setPage] = useState(1);

    //increase page
    const handleIncreasePage = () => {
        setPage((prevPage) => prevPage + 1);
    };


    //decrease page
    const handleDecreasePage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

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
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&primary_release_year=2023&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(data => setPopularMovies(data.results))
            .catch(err => console.error(err));

    }, [page]);

    //get new movies    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US%2C%20vi-VN&page=5&primary_release_date.lte=${today}&sort_by=primary_release_date.desc&with_origin_country=US`, options)
            .then(response => response.json())
            .then(data => setNewMovies(data.results))
            .catch(err => console.error(err));

    }, []);

    //get new series
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.lte=2010&include_adult=true&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_origin_country=US`, options)
            .then(response => response.json())
            .then(data => setNewSeries(data.results))
            .catch(err => console.error(err));
    }, [page]);


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

    //handle search form
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
                <h1 style={{ fontWeight: 'bold' }}>Welcome to MOVIE<span className='text-warning'>HUB</span></h1>
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
            <section className="section popular-courses" style={{ marginTop: "30px" }}>
                <div className="container">



                    {/* Popular Movies end * */}

                    <br></br>
                    <div className="section-header aos" data-aos="fade-up">
                        <h2 className='text-warning'>TV Shows</h2>
                    </div>
                    <hr></hr>

                    {/* New Movies start */}
                    <Row className='newMovie'>
                        {newSeries.map((movie) => (
                            <Col md={3}>

                                <div data-aos="fade-up" style={{ scale: "90%" }} >
                                    <div className="movie">
                                        <div className="movie-img" >
                                            <Link to={`/details/${movie.id}`}>
                                                <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onError={(e) => {
                                                    e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                                }}></img>
                                            </Link>
                                        </div>
                                        <div className="top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <h5 className="text-warning">
                                                <Link className="text-warning" to={`/details/${movie.id}`}>{movie.name}</Link>
                                            </h5>
                                        </div>
                                        <div className="bottom">
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyleType: "none" }}>
                                                <div><i className="far fa-clock"></i> {movie.first_air_date}</div>
                                                <span className="rating text-warning"><i className="fas fa-thumbs-up"></i> {movie.vote_average}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Col>
                        ))}
                    </Row>
                    {/* New Movies end */}
                    <center style={{ padding: '30px' }}>
                        <div className="pagination-buttons">
                            <Button variant="warning" onClick={handleDecreasePage} disabled={page === 1}>
                                Back
                            </Button>
                            <span className="page-number" style={{ fontWeight: 'bold' }}>
                                {page}
                            </span>
                            <Button variant="warning" onClick={handleIncreasePage}>
                                Next
                            </Button>
                        </div>
                    </center>

                </div>
            </section>
        </div>

    );
}
export default TVShowsContent;