import home from '../assets/instructions/home.png'
import reading from '../assets/instructions/reading.png'
import adminpanel from '../assets/instructions/adminPanel.png'
import checkout from '../assets/instructions/checkout.png'
import queries from '../assets/instructions/queries.png'
import stripe from '../assets/instructions/stripe.png'
import userlogin from '../assets/instructions/userLogin.png'

const Instructions = () => {

  return(
    <>
    <p>This a chatgpt powered wrapper. It takes a query from user, draws three tarot cards, and sends it to chatgpt model 3.5 and displays the result reading</p>
    <br />
    <p>in settings you can chose a bias for the reading. You can ask for only good and positive results, you can ask for only bad and depressing results, or you can force the reading to result about something given from the user. Hence BIASED tarot</p>
    <hr />

    <h3>Home page</h3>
    <p>When in Homepage you can choose language -English or Greek-, ask your question and press submit and after a few seconds you get your reading. At the end of the page you can change the bias settings to "G" for good, "B" for bad "Neutral" for normal unbiased reading, or choose a "custom"</p>

    <p>for development purposes: settings password is "settings"</p>

    <img src={home} alt="home" className="img-fluid w-50" />
    <img src={reading} alt="reading" className="img-fluid w-50" />
    <hr />

    <p>from the menu you can choose:</p>
    <ul>
      <li>Home</li>
      <li>Buy me a coffee</li>
      <li>Admin Login</li>
      <li>User Login</li>
      <li>signup</li>
    </ul>

    <h3>Signup</h3>
    <p>here you can create a new user with user name and password</p>

    <h3>User Login</h3>
    <p>here you can login your user</p>
    <p>When loged in an additional submenu for user is foun. SignOut and Queries</p>
    <img src={userlogin} alt="userlogin" className="img-fluid w-50" />
    <hr />

    <h3>Queries</h3>
    <p>Here user can see his old Queries. Can mark them as Important or not important and delete them. Querant can also choose to see all or only important</p>
    <img src={queries} alt="queries" className="img-fluid w-50" />
    <hr />

    <h3>Buyme a coffe</h3>
    <p>In -Buy me a coffee- a user after giving some user info (only email required) can acces a donation "shop" to donate 0,5 / 1 / 2 euros for supporting the page. The Donation is powerd by Stripe </p>
    <img src={stripe} alt="stripe" className="img-fluid w-50" />
    <img src={checkout} alt="checkout" className="img-fluid w-50" />
    <hr />

    <h3>Admin Login</h3>
    <p>Admin can login from here. Admin can choose normal login or google login. When loged in an additional admin pannel is shown in the menu</p>
    <p>You can find admin pass in github README. Admin can be created only through backend</p>
    <br />
    <p>Here admin can see a list of donators transactions. Admin can also mark a transaction as processed and send an automated thank you email.</p>
    <p>A list of participants -donators- can also be seen here</p>
    <p>A list of users can also be found here. Admin can delete a user. If admin clicks on a user name, admin can acces the user queries and responces</p>
    <img src={adminpanel} alt="adminpanel" className="img-fluid w-50" />
    <hr />

    <p>this app was created as part of learning project for Coding Factory 7 - AUEB - Athens </p>
    
    </>
  )
}
export default Instructions