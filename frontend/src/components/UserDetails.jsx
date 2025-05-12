import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Queries from './Queries';

const UserDetail = ({ url }) => {
  const [user, setUser] = useState(null)
  const { id } = useParams();  

  const fetchUserById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data
      console.log('from userdetail user data',userData);

      // setUser(userData)
      setUser({
        ...userData,
        id: userData._id
      })
      console.log('user with right id:', user);
      

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserById();
    };
    fetchData();
  }, [id, url]); 


  return (
    <div>
      <h4>User Detail for ID: {id}</h4>
      {/* Fetch and display user details here */}
      {user 
        ? <Queries user={user} url={url} />
        : <p>Loading user…</p>
      }
    </div>
  );
};

export default UserDetail;