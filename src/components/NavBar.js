import React from 'react';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {

    return (
        <nav>
            <ul className="main-nav">
                <li>
                    <NavLink className="mid-links" to="/home-page">
                        <div className="home-icon-container">
                            <div className="home-icon">
                                <HiOutlineUser size="3.5em" />
                            </div>
                            <div>
                                {props.currentUser.name}
                            </div>
                        </div>
                    </NavLink>
                </li>
                <span className="middle-links">
                    {/* <li><NavLink className="mid-links" to="/movies">Movies</NavLink></li>
                    <li><NavLink className="mid-links" to="/games">Games</NavLink></li>
                    <li><NavLink className="mid-links" to="/images">Images</NavLink></li> */}
                </span>
                <NavLink className="mid-links" to="/" onClick={() => props.handleLogoutClick()}>
                    <li>
                        <div className="logout-icon-container">
                            <div>
                                <HiOutlineLogout size="3.5em" />
                            </div>
                            <div>
                                LOGOUT
                            </div>
                        </div>
                    </li>
                </NavLink>
            </ul>
        </nav>
    );
}

export default NavBar