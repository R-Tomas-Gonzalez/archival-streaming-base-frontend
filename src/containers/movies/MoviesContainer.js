import React from 'react'
import MoviesCard from '../../components/movies/MoviesCard'

const MoviesContainer = (props) => {
    return (
        <div className="action-favorites-container">
            <h2>{props.genre}</h2>
            <div className="action-card-row">
                {props.movies.map((movie) => <MoviesCard key={movie.id} movie={movie} handlePreviewClick={props.handlePreviewClick} addToFaves={props.addToFaves} />)}
            </div>
        </div>
    )
}

export default MoviesContainer