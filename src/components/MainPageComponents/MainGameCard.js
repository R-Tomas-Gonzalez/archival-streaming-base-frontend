import React, { useState } from 'react';
import Modal from '../Modal'

const MainGameCard = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const image = props.game.background_image
    const title = props.game.name

    const splitImg = image.split("/")
    splitImg.splice(4, 0, "crop/600/400")
    const newImage = splitImg.join("/")


    return (
        <div className="column">
            <div className="game-ui-card" onClick={() => setIsOpen(true)}>
                <div className="game-card-image">
                    <img className="image" srcSet={`${newImage} 2x`} alt='game' />
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="game-card-image">
                    <img className="image" srcSet={`${newImage} 1x`} alt='game' />
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </Modal>
        </div>

    );
}

export default MainGameCard;