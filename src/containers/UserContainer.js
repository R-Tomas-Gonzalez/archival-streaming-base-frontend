import Users from '../components/Users';

function UserContainer(props) {
    const users = props.userInfo;

    return (
        <div className="user-row">{users.map(user =>
            user ? <Users key={user._id} user={user} handleSuccessfulAuth={props.handleSuccessfulAuth} /> : ''
        )}</div>
    );
}

export default UserContainer;