import React from 'react';
import { FaRegHeart } from "react-icons/fa";

function GamesCard(props) {

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
                    <button className="add-faves-btn" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.game) }}><FaRegHeart size="1.5em" /></button>
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default GamesCard