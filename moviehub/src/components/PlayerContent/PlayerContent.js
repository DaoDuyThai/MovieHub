import React, { useState, useEffect } from 'react';
import './PlayerContent.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PlayerContent = ({ movieId }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //for movies only
    const [videoKey, setVideoKey] = useState(null);

    //for tv shows only
    const [videoKeyTv, setVideoKeyTv] = useState(null);

    // API key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s',
        },
    };
    //get movie details
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?`, options);
                const data = await response.json();
                setMovieDetails(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    //get similar movies
    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?page=1`, options);
                const data = await response.json();
                setSimilarMovies(data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSimilarMovies();
    }, [movieId]);


    //get video key for movies
    useEffect(() => {
        const fetchMovieVideoMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
                const data = await response.json();
                setVideoKey(data.results[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovieVideoMovies();
    }, [movieId]);

    //get video key for tv shows
    useEffect(() => {
        const fetchMovieVideoTv = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, options);
                const data = await response.json();
                setVideoKeyTv(data.results[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovieVideoTv();
    }, [movieId]);
    console.log(videoKeyTv);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!movieDetails) {
        return <div>Movie not found.</div>;
    }

    // Carousel responsive
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 9,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };



    return (
        <div className="content-container">
            <div className="movie-card">
                <h2 className="text-warning" style={{ marginLeft: "20px", fontWeight: "bold" }}>{movieDetails.original_title}</h2>
                <p style={{ marginLeft: "20px" }}>Have a nice Netflix and Chill!!!</p>
                <div className="container" style={{ textAlign: "center" }}>
                    <iframe
                        width="1000"
                        height="570"
                        src={`https://short.ink/DpF80zGGL`}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                    ></iframe>
                </div>
                <p className="text-light" style={{ marginLeft: "20px" }}>{movieDetails.overview}</p>
            </div>

            <div className="movie-card" style={{ padding: "20px" }}>
                <h2 className="text-warning">
                    Maybe you're also interested
                </h2>
                <Carousel responsive={responsive}>
                    {similarMovies.map((movie) => (
                        <div data-aos="fade-up" style={{ scale: "90%" }} key={movie.id}>
                            <div className="movie">
                                <div className="movie-img">
                                    <Link to={`/details/${movie.id}`}>
                                        <img
                                            className="img-fluid"
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            onError={(e) => {
                                                e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                            }}
                                            alt={movie.original_title}
                                        />
                                    </Link>
                                </div>
                                <div className="top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                    <h5 className="text-warning">
                                        <Link className="text-warning" to={`/details/${movie.id}`}>
                                            {movie.original_title}
                                        </Link>
                                    </h5>
                                </div>
                                <div className="bottom">
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyleType: "none" }}>
                                        <div>
                                            <i className="far fa-clock"></i> {movie.release_date}
                                        </div>
                                        <span className="rating text-warning">
                                            <i className="fas fa-thumbs-up"></i> {movie.vote_average}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default PlayerContent;
