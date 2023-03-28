import React from 'react';
import ImagesCard from '../../components/images/ImagesCard';

function ImagesContainer(props) {
    return (
        <div className="image-action-favorites-container">
            <h2>{props.genre}</h2>
            <div className="action-card-row">
                {props.images.map((image) => <ImagesCard key={image.id} image={image} handlePreviewClick={props.handlePreviewClick} addToFaves={props.addToFaves} />)}
            </div>
        </div>
    )
}

export default ImagesContainer