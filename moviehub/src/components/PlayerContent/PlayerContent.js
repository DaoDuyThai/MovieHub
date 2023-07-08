import React from 'react';
import './PlayerContent.css';
import { useState, useEffect } from 'react';

const PlayerContent = ({ movieId }) => {

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState(null);



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
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?`, options);
                const data = await response.json();
                setMovieDetails(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
    }, [movieId]);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
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
        <div className='content-container'>
            <div className='movie-card'>
                <h2 className='text-warning' style={{ marginLeft: "20px" }}>{movieDetails.original_title}</h2>
                <p style={{ marginLeft: "20px" }}>Have a nice Netflix and Chill!!!</p>
                <div className='container' style={{ textAlign: "center" }}>
                    <iframe
                        width="1000"
                        height="570"
                        src={`https://www.youtube.com/embed/${movie.results[0].key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
                <p className='text-light' style={{ marginLeft: "20px" }}>{movieDetails.overview}</p>



            </div>
        </div>

    );
}
export default PlayerContent;