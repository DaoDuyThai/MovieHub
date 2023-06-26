import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);



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

                    <Carousel responsive={responsive}>
                        {popularMovies.map((movie) => (
                            <div class="course-box aos" data-aos="fade-up" style={{ scale: "80%" }}>
                                <div class="product">
                                    <div class="product-img" >
                                        <a href="profile.html">
                                            <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} ></img>
                                        </a>
                                    </div>
                                    <div class="product-content">
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
                    {/* Popular Movies end * */}


                    <div class="section-header text-center aos" data-aos="fade-up">
                        <h2>New Movies</h2>
                    </div>

                    <Row>
                        <Col md='3'></Col>
                    </Row>






                </div>
            </section>
        </div>

    );
}
export default Home;