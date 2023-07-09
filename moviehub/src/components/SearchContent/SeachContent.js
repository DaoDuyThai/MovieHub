import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './SearchContent.css';

const SearchContent = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleIncreasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTM5MjUzZDY4Y2M4MzAxZjE2ODEzYmNmYjlkYTExOSIsInN1YiI6IjY0OGFjMzk4MjYzNDYyMDEyZDQ4OTJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s9TqYBthAmgaue_Ex1O_XijAbVTGFpaWz4M1MfnO_6s',
    },
  };

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

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
    : movies;

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
        <Form style={{width:"400px", margin:"10px"}}>
          <Form.Group controlId="genreSelect">
            <Form.Label>Genre:</Form.Label>
            <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
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
                  <div class="movie">
                    <div class="movie-img">
                      <Link to={`/details/${movie.id}`}>
                        <img
                          class="img-fluid"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          onError={(e) => {
                            e.target.src =
                              'https://image.tmdb.org/t/p/w500/uS1AIL7I1Ycgs8PTfqUeN6jYNsQ.jpg';
                          }}
                        ></img>
                      </Link>
                    </div>
                    <div class="top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <h5 class="text-warning">
                        <Link class="text-warning" to={`/details/${movie.id}`}>
                          {movie.original_title}
                        </Link>
                      </h5>
                    </div>
                    <div class="bottom">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyleType: 'none' }}>
                        <div>
                          <i class="far fa-clock"></i> {movie.release_date}
                        </div>
                        <span class="rating text-warning">
                          <i class="fas fa-thumbs-up"></i> {movie.vote_average}
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
