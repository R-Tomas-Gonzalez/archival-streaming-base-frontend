import React from 'react';
import MainMovieCard from '../../components/MainPageComponents/MainMovieCard';

const MainMovieContainer = (props) => {
    return (
        <div className="movie-container">
            <h2>Trending Movies</h2>
            <div className="card-row">
                {props.movies.map(movie => <MainMovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>

    );
}

export default MainMovieContainer