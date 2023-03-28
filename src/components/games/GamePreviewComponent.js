import React, { useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";

const gameAPI = process.env.REACT_APP_GAME_KEY

const GamePreviewComponent = (props) => {

    const [gamePreview, setGamePreview] = React.useState({})

    useEffect(() => {
        const gameInfo = async () => {
            const gameRes = await fetch(`https://api.rawg.io/api/games/${props.game.id}?key=${gameAPI}`)
            const fetchedGame = await gameRes.json();

            setGamePreview(fetchedGame)
        }
        gameInfo();

    }, [props.game.id])

    const title = gamePreview.name
    const backdropImg = gamePreview.background_image
    const description = gamePreview.description_raw ? gamePreview.description_raw.split(/(?<=[.!])/g)[0] + gamePreview.description_raw.split(/(?<=[.!])/g)[1] : null;
    const release_date = gamePreview.released ? gamePreview.released.split("-")[0] : null;

    return (
        <div className="preview-header">
            <div className="preview-background">
                <img className="preview-image" srcSet={`${backdropImg} 4x`} alt="preview" />
                <div className="image-poster-overlay" />
            </div>
            <div className="game-preview-details" id="details">
                <div className="title-release">
                    <div className="title"><strong>{title}</strong><span>({release_date})</span></div>
                    <button className="add-faves-btn-preview" data-text="add to faves" onClick={(e) => { e.stopPropagation(); props.addToFaves(props.game) }}><FaRegHeart size="1.5em" /></button>
                    <h2>Overview</h2>
                    <div className="overview">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default GamePreviewComponent