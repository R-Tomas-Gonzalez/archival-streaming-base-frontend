import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

function UserFavesImageCard(props) {
    const img = props.image.largeImageURL
    const name = props.image.user

    return (
        <div className="column">
            <div className="photo-ui-card" onClick={() => props.handlePreviewClick(props.image)}>
                <div className="photo-card-image">
                    <img className="image" srcSet={`${img} 4x`} alt='an_image' />
                    <button className="delete-user-fave-btn" data-text="delete from faves" onClick={() => props.handleDelete(props.image)}><TiDeleteOutline size="2em" /></button>
                </div>
                <div className="card-title">
                    <h3> By {name}</h3>
                </div>
            </div>
        </div>
    );
}

export default UserFavesImageCard