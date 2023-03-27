import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import GamesContainer from '../containers/games/GamesContainer';
import GamePreviewContainer from '../containers/games/GamePreviewContainer';
import GameFavesContainer from '../containers/GameFavesContainer';

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

        if (props.currentUser._id) {
            fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${props.currentUser._id}`)
                .then(resp => resp.json())
                .then(data => setUserFaves(data.games))
        }
    }, [props.currentUser._id])

    const addToFaves = async (game) => {

        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const mappedGamesIds = fetchedUser.games.map((userGame) => {
            return userGame.id;
        })

        let updatedUser;

        if (!mappedGamesIds.includes(game.id)) {
            const newGame = {
                game: game
            }

            try {
                const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}/games`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newGame)
                });
                updatedUser = await updatedUserRes.json();
                setUserFaves(updatedUser.games);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handlePreviewClick = (game) => {
        setGamePreview(game);
    }

    const handleDelete = async (game) => {
        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const filteredGames = fetchedUser.games.filter((userGames) => {
            return userGames.id !== game.id;
        })

        let updatedUser;

        try {
            const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}/games`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ games: filteredGames })
            });
            updatedUser = await updatedUserRes.json();
            setUserFaves(updatedUser.games);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="wrapper">
            <NavBar currentUser={props.currentUser} handleLogoutClick={() => props.handleLogout()} />
            <div>
                <GamePreviewContainer game={gamePreview} addToFaves={(game) => addToFaves(game)} />
            </div>
            <div className="user-favorites-container">
                <GameFavesContainer currentUser={props.currentUser} games={userFaves} handlePreviewClick={handlePreviewClick} handleDelete={handleDelete} />
            </div>
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