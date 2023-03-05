import React from 'react';
import MainGameCard from '../../components/MainPageComponents/MainGameCard';

const MainGameContainer = (props) => {
    return (
        <div className="game-container">
            <h2>Trending Games<span style={{ fontSize: '15px' }}>(PS4 + XBOX one)</span></h2>
            <div className="card-row">
                {props.games.map(game => <MainGameCard key={game.id} game={game} />)}
            </div>
        </div>
    )
}

export default MainGameContainer