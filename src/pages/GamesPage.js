import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import GamesContainer from '../containers/games/GamesContainer';
import GamePreviewContainer from '../containers/games/GamePreviewContainer';

const gameAPI = process.env.REACT_APP_GAME_KEY

function GamesPage(props) {

    const [gamePreview, setGamePreview] = React.useState({});
    const [trendingGames, setTrendingGames] = React.useState([]);
    const [actionGames, setActionGames] = React.useState([]);
    const [indieGames, setIndieGames] = React.useState([]);
    const [shooterGames, setShooterGames] = React.useState([]);
    const [fightingGames, setFightingGames] = React.useState([]);
    const [rpgGames, setRpgGames] = React.useState([]);
    const [userFaves, setUserFaves] = React.useState([]);

    useEffect(() => {
        Promise.all([
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&platforms=1,18&dates=2020-01-01,2020-11-01&ordering=rated`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=4&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=51&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=2&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=6&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games?key=${gameAPI}&genres=5&dates=2019-01-01,2020-11-01`),
            fetch(`https://api.rawg.io/api/games/51325?key=${gameAPI}`),
        ])
            .then(function (response) {
                return Promise.all(response.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                const trendingGameResults = data[0].results;
                const actionGameResults = data[1].results;
                const indieGameResults = data[2].results;
                const shooterGameResults = data[3].results;
                const fightingGameResults = data[4].results;
                const rpgGameResults = data[5].results;
                const gamePreviewResults = data[6];

                setTrendingGames(trendingGameResults);
                setActionGames(actionGameResults);
                setIndieGames(indieGameResults);
                setShooterGames(shooterGameResults);
                setFightingGames(fightingGameResults);
                setRpgGames(rpgGameResults);
                setGamePreview(gamePreviewResults);
            });

        // fetch("https://archival-streaming-base.herokuapp.com/game_favorites")
        //     .then(resp => resp.json())
        //     .then(gameFaves => setUserFaves(gameFaves))
    }, [])

    const addToFaves = () => {

    }

    const handlePreviewClick = (game) => {
        setGamePreview(game);
    }

    return (
        <div className="wrapper">
            <NavBar currentUser={props.currentUser} handleLogoutClick={() => props.handleLogout()} />
            <div>
                <GamePreviewContainer game={gamePreview} addToFaves={(game) => addToFaves(game)} />
            </div>
            {/* <div className="user-favorites-container">
                <UserFavesContainer currentUser={props.currentUser} movies={userFaves} handleStateClick={handleStateClick} handleDelete={handleDelete} />
            </div> */}
            <hr></hr>
            <div className="user-faves-containers">
                <GamesContainer games={trendingGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"trending"} />
                <GamesContainer games={actionGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"action"} />
                <GamesContainer games={indieGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"indie"} />
                <GamesContainer games={shooterGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"shooter"} />
                <GamesContainer games={fightingGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"fighting"} />
                <GamesContainer games={rpgGames} handlePreviewClick={handlePreviewClick} addToFaves={(game) => addToFaves(game)} genre={"RPG"} />
            </div>
        </div>
    )
}

export default GamesPage;