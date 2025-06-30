import { useState, useEffect  } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Participants from './Participants'
import Transactions from './Transactions'
import UsersList from "./UsersList"


const AdminPanel = ({url, handleDeleteParticipant, handleDeleteUser, users, setUsers, participants, setParticipants}) => {

  const [loading, setLoading] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false);
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token"); 
        
        const response = await axios.get(`${url}/participant`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setParticipants(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false); 
      }
    };

      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.get(`${url}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data); // assuming your state is called `users` and holds the user list
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
    fetchUsers()
    fetchParticipants();
  }, [url, setUsers, setParticipants, setLoading]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Only admins can see this.</p>

      <Transactions url={url} />

      <button onClick={() => setShowParticipants(!showParticipants)} className="btn btn-primary">
        {showParticipants && 'Hide Participants'}
        {!showParticipants && 'Show Participants'}
      </button>

      <Participants
        loading={loading}
        participants={participants}
        handleDeleteParticipant={handleDeleteParticipant}
        setParticipants={setParticipants}
        url={url}
        showParticipants={showParticipants}
      />

      <br />

      <button onClick={() => setShowUsers(!showUsers)} className="btn btn-primary">
        {showUsers && 'Hide Users'}
        {!showUsers && 'Show users'}
      </button>

      <UsersList
        loading={loading}
        users={users}
        handleDeleteUser={handleDeleteUser}
        showUsers={showUsers}
        setUsers={setUsers}
        url={url}
      />

    </div>
  )
}

export default AdminPanel