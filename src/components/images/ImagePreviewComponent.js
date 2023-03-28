import React from 'react';
import { FaRegHeart } from "react-icons/fa";

function ImagePreviewComponent(props) {

    const img = props.image.largeImageURL
    const name = props.image.user

    return (
        <div className="image-preview-header">
            <div className="image-preview-background">
                <img className="image-preview-image" srcSet={`${img} 2x`} alt="preview" />
                <div className="image-poster-overlay" />
            </div>
            <div className="image-preview-details" id="details">
                <div className="preview-card">
                </div>
                <div className="image-title-release">
                    <button className="add-faves-btn-preview" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.image) }}><FaRegHeart size="1.5em" /></button>
                    <div className="image-title">Image By <strong>{name}</strong></div>
                </div>
            </div>
        </div>
    );
}

export default ImagePreviewComponent