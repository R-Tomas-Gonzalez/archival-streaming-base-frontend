import React from 'react';
import { FaRegHeart } from "react-icons/fa";

const MoviesCard = (props) => {


    const title = props.movie.original_title
    const img = `https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`

    return (
        <div className="favorite-column">
            <div className="ui-faves-card" onClick={() => props.handlePreviewClick(props.movie)}>
                <div className="faves-card">
                    <img className="faves-image" srcSet={`${img} 1.5x`} alt='movie' />
                    <button className="add-faves-btn" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.movie) }}><FaRegHeart size="1.5em" /></button>
                </div>
                <div className="faves-card-title">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default MoviesCard