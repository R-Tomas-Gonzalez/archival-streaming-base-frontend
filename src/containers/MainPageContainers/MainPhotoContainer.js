import React from 'react';
import MainPhotoCard from '../../components/MainPageComponents/MainPhotoCard';

const MainPhotoContainer = (props) => {
    return (
        <div className="photo-container">
            <h2>New Images</h2>
            <div className="card-row">
                {props.photos.map(photo => <MainPhotoCard key={photo.id} photo={photo} />)}
            </div>
        </div>
    )
}

export default MainPhotoContainer