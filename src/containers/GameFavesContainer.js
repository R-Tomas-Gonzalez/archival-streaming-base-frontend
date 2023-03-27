import React from 'react';
import UserFavesGameCard from '../components/games/UserFavesGameCard';

function GameFavesContainer(props) {
    return (
        <div className="action-favorites-container">
            <h1>{props.currentUser.name}'s Favorites</h1>
            <div className="user-faves-card-row">
                {props.games ? props.games.map(game => <UserFavesGameCard key={game.game_id} game={game} handlePreviewClick={props.handlePreviewClick} handleDelete={props.handleDelete} />) : ''}
            </div>
        </div>
    )
}

export default GameFavesContainer