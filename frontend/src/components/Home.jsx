import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import TarotHome from '../tarot-components/TarotHome'

const Home = ({ message, setMessage, url }) => {
  // επρεπε να γίνει γιατι καλούσε το success 2 φορες δημιουργώντας 2 transactions
  const hasCalledSuccessRef = useRef(false);

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const canceled = searchParams.get('canceled'); 
    const success = searchParams.get('success')
    // added to manage to call stripe.controller.js handlesucces from frontend
    const sessionId = searchParams.get('session_id');
    console.log("sessionId", sessionId);
    

    if (success === 'true' && sessionId && !hasCalledSuccessRef.current){
      // επρεπε να φτιαξω μια νεα function γιατι το axios δεν δουλευε αλλιώς
      const fetchSuccess = async () => {
        try {
          const result = await axios.get(`${url}/stripe/success?session_id=${sessionId}`)
          console.log("Success response:", result.data);
          // για να εμποδίσει επανάληψη της κλήσης
          hasCalledSuccessRef.current = true;
        } catch (error) {
          console.error ("Error handling success:", error)
        }
      }
      fetchSuccess()
      setMessage(`Payment successful! thank you! :)
                  you will soon receive an email with the details`)
    }

    if (canceled === 'true') {
      setMessage('Payment canceled! :(');
      setTimeout(() => {
        setMessage('');
      }, 7000); 
    }

  }, [searchParams, setMessage, url])

  return (
    <>
      {message && (
        <div className={`alert ${message.includes('canceled') ? 'alert-danger' : 'alert-success'} pb-3`} role="alert">
          {message}
        </div>
      )}

      <h1>Biased Tarot</h1>
      <p>revisited</p>

      <TarotHome />
    </>
  )
}

export default Home