import React from 'react';
import { FaRegHeart } from "react-icons/fa";

function ImagesCard(props) {
    const img = props.image.largeImageURL
    const name = props.image.user

    return (
        <div className="column">
            <div className="photo-ui-card" onClick={() => props.handlePreviewClick(props.image)}>
                <div className="photo-card-image">
                    <img className="image" srcSet={`${img} 4x`} alt='movie' />
                    <button className="add-faves-btn" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.image) }}><FaRegHeart size="1.5em" /></button>
                </div>
                <div className="card-title">
                    <h3> By {name}</h3>
                </div>
            </div>
        </div>
    )
}

export default ImagesCard