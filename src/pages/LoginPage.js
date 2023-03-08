// Important functionality
import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners'

// Pages 
import UserContainer from '../containers/UserContainer';

function LoginPage(props) {

    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://shy-pink-shark-yoke.cyclic.app/users', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(users => {
                setUsers([
                    ...users
                ])
            })
    }, [])

    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data);
        navigate('/home-page');
    }

    return (
        <Fragment>
            <div className="login-container-1">
                <div className="site-title">
                    <h1>Archival Streaming Base</h1>
                </div>
                <div className="login-container-2">
                    {users.length ?
                        <Fragment>
                            <div className="login-container-3">
                                <UserContainer userInfo={users} handleSuccessfulAuth={data => handleSuccessfulAuth(data)} />
                            </div>
                        </Fragment>
                        :
                        <div className="login-container-3">
                            <div className="user-row">
                                <PulseLoader loading size={30} color="white" />
                            </div>
                        </div>}
                </div>
            </div>
        </Fragment>
    );
}

export default LoginPage;