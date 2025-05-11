import { Link } from "react-router-dom"
import NewParticipantForm from './NewParticipantForm'

const UsersList = ({ loading, users, handleDeleteUser, showUsers}) => {

  return (
    <>
      {showUsers && (
        <>
          {loading && <p>Loading...</p>}
          
          {!loading && users.length === 0 && <p>No users found</p>}
  
          <ul>
            {!loading && users.length !== 0 &&
              users.map((user) => (
                <li key={user._id || `${user.username}`}>
                  <Link to={`/user/${user._id}`}>
                    {user.username}
                  </Link>
                  <button id={`${user.username}Btn`} onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </li>
              ))
            }
          </ul>
        </>
      )}
    </>
  )
}

export default UsersList