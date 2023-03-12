import React from 'react';
import MoviePreviewComponent from '../../components/movies/MoviePreviewComponent';

const MoviePreviewContainer = (props) => {
    return (
        <div>
            <div className="movie-preview-backdrop">
                {props.movie !== undefined ? <MoviePreviewComponent addToFaves={props.addToFaves} movie={props.movie} /> : null}
            </div>
        </div>
    )
}

export default MoviePreviewContainer