import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    const [movies, setMovies] = useState([]);


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    //fetch api
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc', options)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error(err));

    }, []);





    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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
        <>

            <div className="container-fluid">
                <div class="search-box">
                    <form action="https://mentoring.dreamguystech.com/html/template/search.html">
                        <div class="form-group search-info">
                            <input type="text" class="form-control"
                                placeholder="Search movie names, genre, actor, etc"></input>
                        </div>
                        <button type="submit" class="btn btn-primary search-btn"><i></i> <span>Search</span></button>
                    </form>
                </div>

                <section class="section popular-courses">
                    <div class="container">
                        <div class="section-header text-center aos" data-aos="fade-up">
                            <h2>Popular Movies</h2>
                        </div>

                        <Carousel responsive={responsive}>
                            {movies.map((movie) => (
                                <div class="course-box aos" data-aos="fade-up">
                                    <div class="product">
                                        <div class="product-img" >
                                            <a href="profile.html">
                                                <img class="img-fluid" alt src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{scale:"80%"}}></img>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3 class="title"><a href="profile.html">{movie.original_title}</a></h3>
                                            <div class="author-info">
                                                <div class="author-name">
                                                    {movie.vote_average}
                                                </div>
                                            </div>
                                            <div class="author-country">
                                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>








                    </div>
                </section>
            </div>
        </>
    );
}
export default Home;