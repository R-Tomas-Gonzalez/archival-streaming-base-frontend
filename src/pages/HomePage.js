import React from 'react';
import NavBar from '../components/NavBar';
import MainMovieContainer from '../containers/MainPageContainers/MainMovieContainer';
import MainGameContainer from '../containers/MainPageContainers/MainGameContainer';
import MainPhotoContainer from '../containers/MainPageContainers/MainPhotoContainer';

const HomePage = (props) => {

    return (
        <div className="wrapper">
            <NavBar currentUser={props.currentUser} handleLogoutClick={() => props.handleLogout()} />
            <div className="main-containers">
                <MainMovieContainer movies={props.movies} />
                <MainGameContainer games={props.games} />
                <MainPhotoContainer photos={props.photos} />
            </div>
        </div>
    )
}

export default HomePage