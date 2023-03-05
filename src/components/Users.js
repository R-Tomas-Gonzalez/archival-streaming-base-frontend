import React from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import axios from 'axios';

function Users(props) {

    const handleLoginClick = () => {
        axios.post("https://shy-pink-shark-yoke.cyclic.app/login",
            {
                'id': props.user._id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then((res) => {
                props.handleSuccessfulAuth(res.data);
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