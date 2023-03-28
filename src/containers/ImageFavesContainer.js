import React from 'react';
import UserFavesImageCard from '../components/images/UserFavesImageCard';

function ImageFavesContainer(props) {
    return (
        <div className="action-favorites-container">
            <h1>{props.currentUser.name}'s Favorites</h1>
            <div className="user-faves-card-row">
                {props.images.map((image) => <UserFavesImageCard key={image.id} image={image} handlePreviewClick={props.handlePreviewClick} addToFaves={props.addToFaves} handleDelete={props.handleDelete} />)}
            </div>
        </div>
    )
}

export default ImageFavesContainer