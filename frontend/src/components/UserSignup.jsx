import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const UserSignup = ({ username, password, setUsername, setPassword, url,  setUsers }) => {

  const navigate = useNavigate()

  const handleUserSignup = async (event) => {
    event.preventDefault()
    
    try {
      const newUser = {
        "username": username,
        "password": password
      }

      const response = await axios.post(`${url}/user`, newUser)

      console.log('✅ user created:', response.data)
      alert('User created successfully!')

      // Clear the form if needed
      setUsername('')
      setPassword('')

      // αυτη η μορφή ανανέωσης του state είναι σωστή γιατή μου κάνει refresh την σελίδα
      setUsers(current => [...current, response.data]); // Take the current state (users) and add the new user (response.data) to the end of the array

      navigate("/")
    } catch (error) {
      console.error('Error creating participant:', error)
    }
  }

  return (
    <>
      <form onSubmit={handleUserSignup}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default UserSignup
