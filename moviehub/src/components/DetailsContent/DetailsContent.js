import React, { useState, useEffect } from "react";
import "./DetailsContent.css";
import { useParams, Link } from 'react-router-dom';

function DetailsContent({ movieId }) {
    //get set movie
    const [movie, setMovie] = useState(null);
    //get set loading
    const [isLoading, setIsLoading] = useState(true);
    //get set casts
    const [casts, setCasts] = useState(null);

    // api key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    //get movies list
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?`, options);
                const data = await response.json();
                setMovie(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
    }, [movieId]);


    //get casts list
    useEffect(() => {
        const fetchMovieCredits = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?`, options);
                const data = await response.json();
                setCasts(data.cast);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieCredits();
    }, [movieId]);

    //if is Loading = true --> show loading
    if (isLoading) {
        return (
            <div className="content-container" style={{ height: "500px" }}>
                <div>Loading...</div>
            </div >

        );
    }

    //if movie not found --> show movie not found
    if (!movie) {
        return (
            <div className="content-container" style={{ height: "500px" }}>
                <div>Movie not found.</div>;
            </div >
        );
    }

    return (
        <div className="content-container">
            <div className="movie-card">
                <div className="container">
                    {/* Link to player start  */}
                    <Link to={`/player/${movieId}`}>
                        <img style={{ width: "200px" }} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="cover" />
                    </Link>
                    {/* Link to player stop */}

                    {/* Backdrop start */}
                    <div className="hero" style={{
                        background: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat"
                    }}>
                        <div className="details">
                            <Link to={`/player/${movieId}`}>
                                <div className="title1 text-warning shadow" style={{ fontWeight: "bold", textShadow: "initial" }}>{movie.original_title} </div>
                            </Link>
                            <div className="title2">Release date: {movie.release_date}</div>
                            <fieldset className="rating">
                                <input type="radio" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
                                <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                                <input type="radio" id="star4" name="rating" value="4" checked /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                                <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                                <input type="radio" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                                <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                                <input type="radio" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                                <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                                <input type="radio" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                                <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                            </fieldset>
                            <span className="likes">{movie.popularity}</span>
                        </div>
                    </div>
                    {/* back drop end */}

                    <div className="description row">
                        {/* genres start */}

                        <div className="column1">
                            {
                                movie.genres.map((genre) => (
                                    <span className="tag" key={genre.id}>{genre.name}</span>
                                ))
                            }
                        </div>
                        {/* genres end */}

                        {/* description and cast start */}
                        <div className="column2">
                            <h3 className="text-warning">Description</h3>
                            <p>{movie.overview}</p>
                            <div className="avatars">
                                <hr></hr>
                                <h3 className="text-warning">Casts</h3>
                                {
                                    casts ? (
                                        casts.slice(0, 10).map((cast) => (
                                            <a href="#" data-tooltip={cast.name} data-placement="top" key={cast.id}>
                                                <img
                                                    style={{ width: "54px" }}
                                                    className="rounded-circle"
                                                    src={`https://www.themoviedb.org/t/p/w470_and_h470_face${cast.profile_path}`}
                                                    onError={(e) => {
                                                        e.target.src = "https://www.themoviedb.org/t/p/w470_and_h470_face/77YIEd2tastsT3fjEraKOjCvgyD.jpg";
                                                    }}
                                                />
                                            </a>
                                        ))
                                    ) : (
                                        <div>No cast members available.</div>
                                    )
                                }
                            </div>
                        </div>
                        {/* description and cast end */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsContent;