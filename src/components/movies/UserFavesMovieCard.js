import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

const UserFavesMovieCard = (props) => {
    const title = props.movie.original_title
    const img = `https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`

    return (
        <div className="favorite-column">
            <div className="ui-faves-card" onClick={() => props.handlePreviewClick(props.movie)}>
                <div className="faves-card">
                    <img className="faves-image" srcSet={`${img} 1.5x`} alt='movie' />
                    <button className="delete-user-fave-btn" data-text="delete from faves" onClick={() => props.handleDelete(props.movie)}><TiDeleteOutline size="2em" /></button>
                </div>
                <div className="faves-card-title">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
}

export default UserFavesMovieCard