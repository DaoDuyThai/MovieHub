import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './SearchContent.css';

const SearchContent = ({ query }) => {
  //get set movies list
  const [movies, setMovies] = useState([]);
  //get set page
  const [page, setPage] = useState(1);
  //get set search query
  const [searchQuery, setSearchQuery] = useState('');
  //get set genres list
  const [genres, setGenres] = useState([]);
  //get set selected genre
  const [selectedGenre, setSelectedGenre] = useState('');
  //get set selected rating
  const [selectedRating, setSelectedRating] = useState('');
  //get set selected release date
  const [selectedReleaseDate, setSelectedReleaseDate] = useState('');

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

  //handle genre change
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  //handle rating change
  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  //handle release date change
  const handleReleaseDateChange = (event) => {
    setSelectedReleaseDate(event.target.value);
  };

  //api key
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s',
    },
  };


  //get movies list
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [query, page]);


  //get genres list
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list',
          options
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);


  //get filtered movies list
  const filteredMovies = movies.filter((movie) => {
    // Filter by genre
    if (selectedGenre && movie.genre_ids.includes(parseInt(selectedGenre))) {
      return true;
    }

    // Filter by rating
    if (selectedRating && movie.vote_average >= parseFloat(selectedRating)) {
      return true;
    }

    // Filter by release date
    if (selectedReleaseDate && movie.release_date.split("-")[0] === selectedReleaseDate) {
      return true;
    }

    // Display all movies if no filters are applied
    if (!selectedGenre && !selectedRating && !selectedReleaseDate) {
      return true;
    }

    return false;
  });

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search/${searchQuery}`;
    }
  };

  return (
    <div className="content-container">


      {/* search start */}
      <div className="search-container">
        <h1 style={{ fontWeight: 'bold' }}>
          Welcome to Movie<span className="text-warning">Hub</span>
        </h1>
        <h3 style={{ fontWeight: 'bold' }}>
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
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
              <button type="submit" className="btn btn-warning">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* search end  */}

      {/* filter start */}
      <div className="filter-container">
        <Row>
          {/* filter genre start */}
          <Col md={3}>
            <Form style={{ width: '300px', margin: '10px' }}>
              <Form.Group controlId="genreSelect">
                <Form.Label>Genre:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          {/* filter genre end */}

          {/* filter rating start */}
          <Col md={3}>
            <Form style={{ width: '300px', margin: '10px' }}>
              <Form.Group controlId="ratingSelect">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedRating}
                  onChange={handleRatingChange}
                >
                  <option value="">All Ratings</option>
                  <option value="7">7+</option>
                  <option value="8">8+</option>
                  <option value="9">9+</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          {/* filter rating end */}

          {/* filter release_date start */}
          <Col md={3}>
            <Form style={{ width: '300px', margin: '10px' }}>
              <Form.Group controlId="releaseDateSelect">
                <Form.Label>Release Date:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedReleaseDate}
                  onChange={handleReleaseDateChange}
                >
                  <option value="">All Release Dates</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>

                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          {/* filter release_date end */}
        </Row>
      </div>
      {/* filter end */}

      {/* movies start */}
      <Row>
        <Col md={12}>
          <Row className="">
            {filteredMovies.map((movie) => (
              <Col md={3}>
                <br></br>
                <div data-aos="fade-up" style={{ scale: '90%' }}>
                  <div className="movie">
                    <div className="movie-img">
                      <Link to={`/details/${movie.id}`}>
                        <img
                          className="img-fluid"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          onError={(e) => {
                            e.target.src =
                              'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                          }}
                        ></img>
                      </Link>
                    </div>
                    <div className="top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <h5 className="text-warning">
                        <Link className="text-warning" to={`/details/${movie.id}`}>
                          {movie.original_title}
                        </Link>
                      </h5>
                    </div>
                    <div className="bottom">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyleType: 'none' }}>
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
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      {/* movies end */}

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
  );
};

export default SearchContent;
