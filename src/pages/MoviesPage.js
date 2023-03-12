import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import MoviesContainer from '../containers/movies/MoviesContainer';
import MoviePreviewContainer from '../containers/movies/MoviePreviewContainer';
import UserFavesContainer from '../containers/UserFavesContainer';

const movieAPI = process.env.REACT_APP_MOVIE_KEY;

const MoviesPage = (props) => {

    const [userFaves, setUserFaves] = React.useState([]);
    const [moviePreview, setMoviePreview] = React.useState({});
    const [trendingMovies, setTrendingMovies] = React.useState([]);
    const [actionMovies, setActionMovies] = React.useState([]);
    const [docuMovies, setDocuMovies] = React.useState([]);
    const [dramaMovies, setDramaMovies] = React.useState([]);
    const [scifiMovies, setScifiMovies] = React.useState([]);
    const [thrillerMovies, setThrillerMovies] = React.useState([]);

    useEffect(() => {
        Promise.all([
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${movieAPI}`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28%2C%2028`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=99`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=10751`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878`),
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53`),

        ])
            .then(function (responses) {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                const trendingMovieResults = data[0].results;
                const actionMovieResults = data[1].results;
                const docuMovieResults = data[2].results;
                const dramaMovieResults = data[3].results;
                const scifiMovieResults = data[4].results;
                const thrillerMovieResults = data[5].results;

                const grabMovieInfo = (results) => {
                    const newResults = results.filter(result => result.poster_path != null)
                    return newResults
                }

                setTrendingMovies(grabMovieInfo(trendingMovieResults));
                setActionMovies(grabMovieInfo(actionMovieResults));
                setDocuMovies(grabMovieInfo(docuMovieResults));
                setDramaMovies(grabMovieInfo(dramaMovieResults));
                setScifiMovies(grabMovieInfo(scifiMovieResults));
                setThrillerMovies(grabMovieInfo(thrillerMovieResults));
            })

        if (props.currentUser._id) {
            fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${props.currentUser._id}`)
                .then(resp => resp.json())
                .then(data => {
                    setUserFaves(data.movies);
                })
        }

    }, [props.currentUser._id])

    const addToFaves = async (movie) => {

        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const mappedMovieIds = fetchedUser.movies.map((userMovie) => {
            return userMovie.id;
        })

        let updatedUser;

        if (!mappedMovieIds.includes(movie.id)) {
            const newMovie = {
                movie: movie
            }

            try {
                const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMovie)
                });
                updatedUser = await updatedUserRes.json();
                setUserFaves(updatedUser.movies);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleStateClick = (movie) => {
        setMoviePreview(movie);
    }

    const handleDelete = async (movie) => {
        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const filteredMovies = fetchedUser.movies.filter((userMovies) => {
            return userMovies.id !== movie.id;
        })

        let updatedUser;

        try {
            const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movies: filteredMovies })
            });
            updatedUser = await updatedUserRes.json();
            console.log(updatedUser);
            setUserFaves(updatedUser.movies);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="wrapper">
            <NavBar currentUser={props.currentUser} handleLogoutClick={() => props.handleLogout()} />
            <div>
                {Object.keys(moviePreview).length === 0 ? <MoviePreviewContainer movie={props.movies[0]} addToFaves={(movie) => addToFaves(movie)} /> : <MoviePreviewContainer movie={moviePreview} addToFaves={(movie) => addToFaves(movie)} />}
            </div>
            <div className="user-favorites-container">
                <UserFavesContainer currentUser={props.currentUser} movies={userFaves} handleStateClick={handleStateClick} handleDelete={handleDelete} />
            </div>
            <hr></hr>
            <div className="user-faves-containers">
                <MoviesContainer movies={trendingMovies} genre={"trending"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
                <MoviesContainer movies={actionMovies} genre={"action"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
                <MoviesContainer movies={docuMovies} genre={"documentary"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
                <MoviesContainer movies={dramaMovies} genre={"drama & family"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
                <MoviesContainer movies={scifiMovies} genre={"sci-fi"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
                <MoviesContainer movies={thrillerMovies} genre={"thriller"} handleStateClick={handleStateClick} addToFaves={(movie) => addToFaves(movie)} />
            </div>
        </div>
    )
}

export default MoviesPage