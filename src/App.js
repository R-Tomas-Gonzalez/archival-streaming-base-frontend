import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import axios from 'axios';
import HomePage from './pages/HomePage';

const pixAPI = process.env.REACT_APP_PIX_KEY
const movieAPI = process.env.REACT_APP_MOVIE_KEY
const gameAPI = process.env.REACT_APP_GAME_KEY

function App() {

  const [loggedInStatus, setLoggedInStatus] = React.useState('NOT_LOGGED_IN');
  const [user, setUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [games, setGames] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${movieAPI}`),
        axios.get(`https://api.rawg.io/api/games?key=${gameAPI}&platforms=1,18&ordering=rated`),
        axios.get(`https://pixabay.com/api/?key=${pixAPI}&orientation=horizontal&image_type=photo`),
      ])
        .then(data => {
          setMovies(data[0].data.results)
          setGames(data[1].data.results)
          setPhotos(data[2].data.hits)
        })
    }

    const checkLoginStatus = () => {
      axios.get("https://shy-pink-shark-yoke.cyclic.app/login", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(resp => {
          console.log(resp);
          if (resp.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
            setLoggedInStatus("LOGGED_IN");
            setUser(resp.data.user);
          } else if (!resp.data.logged_in & loggedInStatus === "LOGGED_IN") {
            setLoggedInStatus("NOT_LOGGED_IN");
            setUser({})
          }
        })
        .catch(error => { console.log("check login error", error) })
    }

    //   axios.get("http://localhost:3000/login", {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    //   })
    //     .then(resp => {
    //       console.log(resp);
    //       if (resp.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
    //         setLoggedInStatus("LOGGED_IN");
    //         setUser(resp.data.user);
    //       } else if (!resp.data.logged_in & loggedInStatus === "LOGGED_IN") {
    //         setLoggedInStatus("NOT_LOGGED_IN");
    //         setUser({})
    //       }
    //     })
    //     .catch(error => { console.log("check login error", error) })
    // }

    fetchData();
    checkLoginStatus();

  }, [loggedInStatus])

  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/login", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
      .then(resp => {
        console.log(resp.data.logged_in, loggedInStatus, user)
        if (resp.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(resp.data.user);
        } else if (!resp.data.logged_in & loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({})
        }
      })
      .catch(error => { console.log("check login error", error) })
  }


  const returnData = () => {
    console.log(movies, games, photos);
  }

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  }

  const handleLogout = () => {
    axios.get('http://localhost:3000/logout', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser({});
      })
  }


  return (
    <div className="App-background">
      <div className="App">
        {/* <button onClick={() => checkLoginStatus()}>
          get
        </button>
        <button onClick={() => handleLogout()}>
          destroy
        </button>
        <button onClick={() => returnData()}>
          returnData
        </button> */}
        <Routes>
          <Route
            exact
            path="/"
            element={(<LoginPage handleLogin={data => handleLogin(data)} />)}
          />
          <Route
            exact
            path={"/home-page"}
            element={(<HomePage currentUser={user} handleLogout={() => handleLogout()} movies={movies} games={games} photos={photos} />)}
          />
          {/* <Route
              exact
              path={"/movies"}
              render={props => (<MoviesPage {...props} currentUser={user} handleLogout={this.handleLogout} movies={movies} />
              )}
            />
            <Route
              exact
              path={"/games"}
              render={props => (<GamesPage {...props} currentUser={user} handleLogout={this.handleLogout} games={games} game={games[0]} />
              )}
            />
            <Route
              exact
              path={"/images"}
              render={props => (<ImagesPage {...props} currentUser={user} handleLogout={this.handleLogout} photos={photos} />
              )}
            /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
