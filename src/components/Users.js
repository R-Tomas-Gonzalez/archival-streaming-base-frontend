import React from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import axios from 'axios';

function Users(props) {

    const handleLoginClick = () => {
        let data = { 'id': props.user._id }
        fetch("https://shy-pink-shark-yoke.cyclic.app/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((resp) => resp.json())
            .then(resp => {
                props.handleSuccessfulAuth(resp);
            })
            .catch(error => { console.log('login error', error) })
    }


    return (
        < div className="user-box-container" onClick={() => { handleLoginClick() }}>
            < div className="user-box" >
                <div className="user-icon">
                    <HiOutlineUser size="7em" />
                </div>
            </div >
            <div className="user-text">{props.user.name.toUpperCase()}</div>
        </div >
    );
}

export default Users;