/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Checkout from './components/Checkout'
import GoogleSuccess from './components/GoogleSuccess'
import LoginForm from './components/LoginForm'
import AdminLogedInView from './components/AdminLogedInView'
import AdminPanel from './components/AdminPanel'
import ProtectedRoute from './services/ProtectedRoute'
import UserDetail from './components/ParticipantDetail'
import Appbar from './components/Appbar'
import Home from './components/Home'
import Participantinfoform from './components/ParticipantInfoForm'
import Deck1 from './tarot-components/Deck1'
import UserLoginForm from './components/UserLoginForm'
import UserSignup from './components/userSignup'
import Queries from './components/Queries'
import ParticipantDetail from './components/ParticipantDetail'
import UserDetails from './components/UserDetails'

// const url = 'http://localhost:3001/api'
const url = 'https://revistedtarotbiasapp.onrender.com/api'

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [participants, setParticipants] = useState([])
  const [admin, setAdmin] = useState(null)
  const [newParticipant, setNewParticipant] = useState(null)

  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    const roles = JSON.parse(localStorage.getItem("roles"))
    const adminFromStorage = JSON.parse(localStorage.getItem("admin"))
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (token && roles) {
      if (adminFromStorage && roles.includes("admin")) {
        setAdmin({ token, roles });
        setUserIsAdmin(true);
      } else if (userFromStorage) {
        setUser(userFromStorage);
        setUserIsAdmin(roles.includes("admin"));
      }
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Submitting login...")

    try {
      const response = await axios.post(`${url}/login`, {
        "username": username,
        "password": password
      })
      console.log("Login successful", response.data)
      const { token, admin } = response.data.data
      setUser(admin)
      localStorage.setItem("token", token)
      localStorage.setItem("roles", JSON.stringify(admin.roles))

      setAdmin({ token, roles: admin.roles })
      localStorage.setItem("admin", JSON.stringify(admin));

      const isAdmin = admin.roles.includes("admin")
      setUserIsAdmin(isAdmin)
      console.log("Is admin?", isAdmin)

    } catch (error) {
      console.log(error)     
    }
    navigate("/")
  }

  const handleUserLogin = async (event) => {
    event.preventDefault()
    console.log("Submitting login...")

    try {
      const response = await axios.post(`${url}/userAuth/login`, {
        "username": username,
        "password": password
      })
      console.log("Login successful", response.data)
      const { token, user } = response.data.data
      setUser(user)
      localStorage.setItem("token", token)
      localStorage.setItem("roles", JSON.stringify(user.roles))
      localStorage.setItem("user", JSON.stringify(user))

      const isAdmin = user.roles.includes("admin")
      setUserIsAdmin(isAdmin)
      console.log("Is admin?", isAdmin)

    } catch (error) {
      console.log(error)     
    }
    navigate("/")
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("roles");
    localStorage.removeItem("admin");
    localStorage.removeItem("user")
    setAdmin(null)
    setUserIsAdmin(false)
    setUser(null)
    console.log("Logged out successfully")
    navigate("/")
  }

  const handleAdminBtn = () => {
    console.log("Admin Btn clicked, is admin:", userIsAdmin)
    navigate("/admin")   
  }

  const handleDeleteParticipant = async (participantId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this participant?")
    if (!isConfirmed) {
      console.log("Participant deletion cancelled");
      return; // Exit the function if the user cancels
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${url}/participant/${participantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Participant deleted", response.data);
      alert('Participant deleted successfully!')

      setParticipants(participants.filter(participant => participant._id !== participantId)); // αυτο προστεθηκε γιατι δεν πρεπει να κανεις ανανεωση της σελιδας σε single page app

    } catch (error) {
      console.error("Failed to delete participant", error.response?.data || error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?")
    if (!isConfirmed) {
      console.log("User deletion cancelled");
      return; // Exit the function if the user cancels
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${url}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("User deleted", response.data);
      alert('User deleted successfully!')

      setUsers(users.filter(user => user._id !== userId)); // αυτο προστεθηκε γιατι δεν πρεπει να κανεις ανανεωση της σελιδας σε single page app

    } catch (error) {
      console.error("Failed to delete user", error.response?.data || error.message);
    }
  }

  return (
<div className="bg-dark text-light d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative' }}>

    <div className="position-absolute top-0 end-0 p-2 z-3">
      <Appbar 
        admin={admin}
        handleLogout={handleLogout}
        user={user}
      />
    </div>


      {/* Routes here handle sub-pages like /admin */}
      <Routes>
        <Route path="/" element={
          <>
            <Home 
              message={message}
              setMessage={setMessage}
              url={url}
            />
          </>
        } />
        
        <Route path='/deck1' element={
            <Deck1 />
        } />

        <Route path="/cancel" element={
          <>
            <Home 
              message={message}
              setMessage={setMessage}
              url={url}
            />
          </>
        } />

        <Route path="/success" element={
          <>
            <Home 
              message={message}
              setMessage={setMessage}
              url={url}
            />
          </>
        } /> 

        <Route path="/admin" element={
          <>
            <ProtectedRoute admin={admin} requiredRole="admin"></ProtectedRoute>
            <AdminPanel
              url={url}
              handleDeleteParticipant={handleDeleteParticipant}
              participants={participants}
              setParticipants={setParticipants}
              users={users}
              setUsers={setUsers}
              handleDeleteUser={handleDeleteUser}
            />
          </>
        } />  

        <Route path="/google-success" element={
          <GoogleSuccess setAdmin={setAdmin} setIsAdmin={setIsAdmin} />
        } />

        <Route path="/login" element={
          <>
            <LoginForm 
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              url={url}
            />
          </>
        } />

        <Route path="/userlogin" element={
          <>
            <UserLoginForm 
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleUserLogin={handleUserLogin}
              url={url}
            />
          </>
        } />

        <Route path="/signup" element={
          <UserSignup 
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            url={url}
            setUsers={setUsers}
          />
        }>
        </Route>

        <Route path="/queries" element={
          <Queries
            user={user}
            url={url}
          />
        }>
        </Route>

        <Route path='/buymeacoffee' element={
          // <Checkout />
          <Participantinfoform 
            // newParticipant={newParticipant}
            setNewParticipant={setNewParticipant}
          />
        } />

        <Route path='/checkout' element={
          <Checkout 
            // newParticipant={newParticipant}
          />
        } />

        <Route path="/participant" element={<AdminPanel handleDeleteUser={handleDeleteParticipant} url={url} />} />
        <Route path="/participant/:id" element={<ParticipantDetail />} />

        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default App