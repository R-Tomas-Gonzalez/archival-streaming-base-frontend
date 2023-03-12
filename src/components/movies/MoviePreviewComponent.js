import React from 'react';
import { FaRegHeart } from "react-icons/fa";

const MoviePreviewComponent = (props) => {
    const backdropImg = `https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`
    const posterImg = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
    const title = props.movie.original_title
    const release_date = props.movie.release_date.split("-")[0]

    const overview = props.movie.overview

    return (
        <div className="preview-header">
            <div className="preview-background">
                <div className="empty-div"></div>
                <img className="preview-image" srcSet={`${backdropImg} 4x`} alt="preview" />
                <div className="poster-overlay" />
            </div>
            <div className="preview-details" id="details">
                <div className="preview-card">
                    <img className="preview-card-image" srcSet={`${posterImg} 1.8x`} alt='movie' />
                </div>
                <div className="title-release">
                    <div className="title"><strong>{title}</strong><span>({release_date})</span></div>
                    <button className="add-faves-btn-preview" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.movie) }}><FaRegHeart size="1.5em" /></button>
                    <h2>Overview</h2>
                    <div className="overview">{overview}</div>
                </div>

            </div>
        </div>
    );
}

export default MoviePreviewComponent