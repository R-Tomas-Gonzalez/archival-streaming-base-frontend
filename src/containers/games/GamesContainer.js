import React from 'react'
import GamesCard from '../../components/games/GamesCard'

function GamesContainer(props) {
    return (
        <div className="action-favorites-container">
            <h2>{props.genre}</h2>
            <div className="action-card-row">
                {props.games.map((game) => <GamesCard key={game.id} game={game} handlePreviewClick={props.handlePreviewClick} addToFaves={props.addToFaves} />)}
            </div>
        </div>
    )
}

export default GamesContainer