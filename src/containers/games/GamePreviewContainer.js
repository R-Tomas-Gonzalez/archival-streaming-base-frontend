import React from 'react';
import GamePreviewComponent from '../../components/games/GamePreviewComponent';

function GamePreviewContainer(props) {
    return (
        <div>
            <div className="game-preview-backdrop">
                {props.game !== undefined ? <GamePreviewComponent addToFaves={props.addToFaves} game={props.game} /> : null}
            </div>
        </div>
    )
}

export default GamePreviewContainer