import React, { useState } from 'react';
import Modal from '../Modal';

const MainMovieCard = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const title = props.movie.original_title
    const img = `https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`
    const regImg = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`

    return (
        <div className="column">
            <div className="ui-card" onClick={() => setIsOpen(true)}>
                <div className="card">
                    <img className="image" srcSet={`${img} 1.5x`} alt='movie' />
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="card">
                    <img className="image" srcSet={`${regImg} 1.5x`} alt='movie' />
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
            </Modal>
        </div>
    );
}

export default MainMovieCard