import React from 'react';
import UserFavesMovieCard from '../components/movies/UserFavesMovieCard';

const MovieFavesContainer = (props) => {
    return (
        <div className="action-favorites-container">
            <h1>{props.currentUser.name}'s Favorites</h1>
            <div className="user-faves-card-row">
                {props.movies ? props.movies.map(movie => <UserFavesMovieCard key={movie.movie_id} movie={movie} handlePreviewClick={props.handlePreviewClick} handleDelete={props.handleDelete} />) : ''}
            </div>
        </div>
    )
}

export default MovieFavesContainer