import React, { useState, useEffect } from "react";
import "./DetailsContent.css";
import { useParams, Link } from 'react-router-dom';


function DetailsContent({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //api key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
                const data = await response.json();
                setMovie(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found.</div>;
    }

    return (
        <div className="content-container">
            <div className="movie-card">
                <div className="container">
                    <Link to="#">
                        <img style={{ width: "200px" }} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className="cover" />
                    </Link>
                    <div className="hero" style={{
                        background: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`, backgroundSize: "100%", backgroundRepeat: "no-repeat"
                    }}>
                        <div className="details">
                            <div className="title1 text-warning shadow" style={{ fontWeight: "bold", textShadow: "initial" }}>{movie.original_title} </div>
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
                    <div className="description row">
                        <div className="column1">{
                            movie.genres.map((genre) => (
                                <span className="tag">{genre.name}</span>
                            ))
                        }
                        </div>
                        <div className="column2">
                            <p>{movie.overview}</p>
                            <div className="avatars">
                                <a href="#" data-tooltip="Person 1" data-placement="top">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar1.png" alt="avatar1" />
                                </a>
                                <a href="#" data-tooltip="Person 2" data-placement="top">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar2.png" alt="avatar2" />
                                </a>
                                <a href="#" data-tooltip="Person 3" data-placement="top">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar3.png" alt="avatar3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default DetailsContent;
