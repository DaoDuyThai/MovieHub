import React, { useState, useEffect } from "react";
import "./DetailsContent.css";
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { toast } from 'react-toastify';

function DetailsContent({ movieId }) {
    //get set movie
    const [movie, setMovie] = useState(null);
    //get set loading
    const [isLoading, setIsLoading] = useState(true);
    //get set casts
    const [casts, setCasts] = useState(null);
    //get set similar movies
    const [similarMovies, setSimilarMovies] = useState([]);
    //get reviews
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [id, setId] = useState(null);
    const [role, setRole] = useState('');

    const [reviews, setReviews] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [review, setReview] = useState({});

    // api key to the movie database
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s'
        }
    };

    // get account from sessionStorage
    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn');
        const storedUsername = sessionStorage.getItem('username');
        const id = sessionStorage.getItem('id');
        const role = sessionStorage.getItem('role');
        if (loggedInStatus === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setId(id);
            setRole(role);
        }
    }, []);

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

    //get reviews
    useEffect(() => {
        fetch(`http://localhost:8000/reviews?movie_id=${movieId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(reviews => {
                setReviews(reviews)
            })

    }, [movieId])

    //get account 
    useEffect(() => {
        fetch(`http://localhost:8000/account`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(accounts => {
                setAccounts(accounts)
            })

    }, [movieId])

    //if is Loading = true --> show loading
    if (isLoading) {
        return (
            <div className="content-container" style={{ height: "500px" }}>
                <div>Loading...</div>
            </div>
        );
    }

    //if movie not found --> show movie not found
    if (!movie) {
        return (
            <div className="content-container" style={{ height: "500px" }}>
                <div>Movie not found.</div>
            </div>
        );
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

    // comments
    const handleAdd = () => {
        if (checkEmpty(review?.content)) {
            let method = "";
            let url = ""
            const newReview = {
                ...review,
                user_id: parseInt(id),
                movie_id: parseInt(movieId),
            }
            const currentReview = reviews.find(rv => rv.user_id === id)

            if (currentReview === undefined) {
                method = "POST"
                url = ""
                setReviews([...reviews, newReview]);
                console.log(newReview);
            } else {
                method = "PUT"
                url = `/${review.id}`
                const newReviews = reviews.map(rv => {
                    if (rv.id !== currentReview.id) {
                        return rv
                    } else {
                        return newReview
                    }
                })
                setReviews(newReviews)
            }
            fetch(`http://localhost:8000/reviews${url}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            })
        }
    }

    // check comment 
    const checkEmpty = (...param) => {
        for (let index = 0; index < param.length; index++) {
            const element = param[index];
            if (element === undefined || element.trim() === '') {
                toast("Bình luận không được để trống.")
                return false;
            }
        }
        return true;
    }

    // post comment
    const handleChange = (e) => {
        const { value, name } = e.target;
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    };

    // Function to handle editing comment content
    const handleEditChange = (commentId, content) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === commentId) {
                    return { ...review, content };
                } else {
                    return review;
                }
            })
        );
    };

    // Function to save the edited comment
    const handleSaveEdit = (commentId) => {
        const editedReview = reviews.find(review => review.id === commentId);
        fetch(`http://localhost:8000/reviews/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedReview)
        })
            .then(response => {
                if (response.ok) {
                    // Success message or any additional logic after successful edit
                    console.log('Comment edited successfully!');
                } else {
                    throw new Error('Failed to edit comment.');
                }
            })
            .catch(error => {
                console.error(error);
                // Error handling or notification (toast) for edit failure
                toast.error('Failed to edit comment.');
            });
    };

    // Function to handle comment editing mode
    const handleEdit = (commentId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === commentId) {
                    return { ...review, editing: true };
                } else {
                    return { ...review, editing: false };
                }
            })
        );
    };

    // Function to handle deleting a comment
    const handleDelete = (commentId) => {
        fetch(`http://localhost:8000/reviews/${commentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    setReviews(prevReviews => prevReviews.filter(review => review.id !== commentId));
                    // Success message or any additional logic after successful delete
                    console.log('Comment deleted successfully!');
                } else {
                    throw new Error('Failed to delete comment.');
                }
            })
            .catch(error => {
                console.error(error);
                // Error handling or notification (toast) for delete failure
                toast.error('Failed to delete comment.');
            });
    };

    return (
        <div className="content-container">
            <div className="movie-card">
                <div className="container">
                    {/* Link to player start */}
                    <Link to={`/player/${movieId}`}>
                        <img style={{ width: "200px" }} src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="" className="cover" />
                    </Link>
                    {/* Link to player stop */}

                    {/* Backdrop start */}
                    <div className="hero" style={{
                        background: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat"
                    }}>
                        <div className="details">
                            <Link to={`/player/${movieId}`}>
                                <div className="title1 text-warning shadow" style={{ fontWeight: "bold", textShadow: "initial" }}>{movie?.original_title} </div>
                            </Link>
                            <div className="title2">Release date: {movie?.release_date}</div>
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
                            <span className="likes">{movie?.popularity}</span>
                        </div>
                    </div>
                    {/* back drop end */}

                    <div className="description row">
                        {/* genres start */}
                        <div className="column1">
                            {movie?.genres?.map((genre) => (
                                <span className="tag" key={genre?.id}>{genre?.name}</span>
                            ))}
                        </div>
                        {/* genres end */}

                        {/* description and cast start */}
                        <div className="column2">
                            <h3 className="text-warning">Description</h3>
                            <p>{movie?.overview}</p>
                            <div className="avatars">
                                <hr></hr>
                                <h3 className="text-warning">Casts</h3>
                                {casts ? (
                                    casts?.slice(0, 10).map((cast) => (
                                        <a href="#" data-tooltip={cast?.name} data-placement="top" key={cast?.id}>
                                            <img
                                                style={{ width: "54px" }}
                                                className="rounded-circle"
                                                src={`https://www.themoviedb.org/t/p/w470_and_h470_face${cast?.profile_path}`}
                                                onError={(e) => {
                                                    e.target.src = "https://www.themoviedb.org/t/p/w470_and_h470_face/77YIEd2tastsT3fjEraKOjCvgyD.jpg";
                                                }}
                                                alt={cast?.name}
                                            />
                                        </a>
                                    ))
                                ) : (
                                    <div>No cast members available.</div>
                                )}
                            </div>
                        </div>
                        {/* description and cast end */}
                    </div>
                </div>
            </div>

            <div className="movie-card" style={{ padding: "20px" }}>
                {/* comment start */}
                {isLoggedIn == true ? (
                    <div>
                        <div className="column2">
                            <div className='row'>
                                <h2 className="text-warning"> Write your comment:</h2>
                                <br />
                                <textarea className="search-input text-dark" style={{ backgroundColor: "white", width: "700px" }} name="content" value={review.content || ''} onChange={handleChange}></textarea>
                                <br></br>
                                <button style={{ marginTop: "25px", width: "100px" }} className="btn btn-warning" onClick={() => handleAdd()} >Submit</button>
                            </div>
                            <hr></hr>
                            <h2 style={{ fontWeight: "bold", marginTop: "30px" }} className="text-warning"> Comment</h2>
                            {reviews.length > 0 ? reviews.map(rv => (
                                <div className='col-sm-12' key={rv.id}>
                                    <span style={{ fontWeight: 'bold' }} className="text-warning col-sm-4" >
                                        {accounts.find(a => a.id === rv.user_id)?.name}:
                                    </span>
                                    <br></br>
                                    <span className='col-sm-8'>
                                        {rv.editing ? (
                                            <>
                                                <textarea
                                                    style={{ backgroundColor: "white" }}
                                                    name="content"
                                                    value={rv.content || ''}
                                                    onChange={(e) => handleEditChange(rv.id, e.target.value)}
                                                />
                                                <button onClick={() => handleSaveEdit(rv.id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                {rv.content}
                                                {isLoggedIn && rv.user_id === id && (
                                                    <div>
                                                        <button onClick={() => handleEdit(rv.id)}>Edit</button>
                                                        <button onClick={() => handleDelete(rv.id)}>Delete</button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </div>
                            )) : <span className='col-sm-12'>No comment </span>}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="column2">
                                <div className='row'>
                                    <h2 className="text-warning" style={{fontWeight:"bold"}}> Comment of {username}</h2>
                                    <br />
                                    <textarea className="search-input" style={{ backgroundColor: "white", color:"black" }} name="content" value={review.content || ''} onChange={handleChange}></textarea>
                                    <Link to="/login">
                                        <button className="btn btn-warning" style={{marginTop:"10px"}}>Submit</button>
                                    </Link>
                                </div>
                            <h2 className="text-warning" style={{fontWeight:"bold"}}> Comments</h2>
                            {reviews.length > 0 ? reviews.map(rv => (
                                <>
                                    <div className='col-sm-12' style={{ marginTop: "10px" }} key={rv.id}>
                                        <span
                                            style={{ fontWeight: 'bold', color: "white" }}
                                            className="col-sm-4"
                                        >
                                            <div className="text-warning" >{accounts.find(a => a.id === rv.user_id)?.name}: </div>
                                            
                                        </span>
                                        <span className='col-sm-8 text-light'>
                                            {rv.content}
                                        </span>

                                    </div>

                                </>

                            )) : <span className='col-sm-12'>No comment</span>}
                        </div>
                    </>
                )}

                {/* comment end */}
                <hr></hr>
                <h2 className="text-warning">Maybe you're also interested</h2>
                <Carousel responsive={responsive}>
                    {similarMovies.map((movie) => (
                        <div
                            data-aos="fade-up"
                            style={{ scale: "90%" }}
                            key={movie?.id}
                        >
                            <div className="movie">
                                <div className="movie-img">
                                    <Link to={`/details/${movie?.id}`}>
                                        <img
                                            className="img-fluid"
                                            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                                            onError={(e) => {
                                                e.target.src = 'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                                            }}
                                            alt={movie?.original_title}
                                        />
                                    </Link>
                                </div>
                                <div
                                    className="top"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <h5 className="text-warning">
                                        <Link
                                            className="text-warning"
                                            to={`/details/${movie.id}`}
                                        >
                                            {movie?.original_title}
                                        </Link>
                                    </h5>
                                </div>
                                <div className="bottom">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            listStyleType: "none",
                                        }}
                                    >
                                        <div>
                                            <i className="far fa-clock"></i> {movie?.release_date}
                                        </div>
                                        <span className="rating text-warning">
                                            <i className="fas fa-thumbs-up"></i> {movie?.vote_average}
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
}

export default DetailsContent;