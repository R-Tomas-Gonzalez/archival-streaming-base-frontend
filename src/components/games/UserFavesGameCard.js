import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

function UserFavesGameCard(props) {
    const image = props.game.background_image
    const title = props.game.name

    const splitImg = image.split("/")
    splitImg.splice(4, 0, "crop/600/400")
    const newImage = splitImg.join("/")


    return (
        <div className="column">
            <div className="game-ui-card" onClick={() => props.handlePreviewClick(props.game)}>
                <div className="game-card-image">
                    <img className="image" srcSet={`${newImage} 2x`} alt='game' />
                    <button className="delete-user-fave-btn" data-text="delete from faves" onClick={() => props.handleDelete(props.movie)}><TiDeleteOutline size="2em" /></button>
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
}

export default UserFavesGameCard