import home from '../assets/instructions/home.png';
import reading from '../assets/instructions/reading.png';
import adminpanel from '../assets/instructions/adminPanel.png';
import checkout from '../assets/instructions/checkout.png';
import queries from '../assets/instructions/queries.png';
import stripe from '../assets/instructions/stripe.png';
import userlogin from '../assets/instructions/userLogin.png';

const Instructions = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '900px' }}>
        <div className="card-body text-justify">
          <p>
            This is a ChatGPT-powered wrapper. It takes a query from the user, draws three tarot cards,
            sends it to the ChatGPT 3.5 model, and displays the result.
          </p>
          <p>
            In settings, you can choose a bias for the reading: only good (positive) results, only bad (depressing),
            or force the reading to focus on a specific user topic — hence the name *Biased Tarot*.
          </p>

          <hr />

          <h3>Home Page</h3>
          <p>
            Choose language (English or Greek), ask your question, and press submit. After a few seconds,
            you’ll get your tarot reading. At the bottom, you can adjust bias settings:
            "G" for good, "B" for bad, "Neutral", or "Custom".
          </p>
          <p>Dev password for settings: <strong>settings</strong></p>
          <div className="text-center mb-3">
            <img src={home} alt="home" className="img-fluid mb-2" style={{ maxWidth: '300px' }} />
            <img src={reading} alt="reading" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>

          <hr />

          <p>From the menu, you can choose:</p>
          <ul>
            <li>Home</li>
            <li>Buy me a coffee</li>
            <li>Admin Login</li>
            <li>User Login</li>
            <li>Signup</li>
          </ul>

          <h3>Signup</h3>
          <p>Create a new user with a username and password.</p>

          <h3>User Login</h3>
          <p>Login as a user. Once logged in, you’ll see additional options like Sign Out and Queries.</p>
          <div className="text-center mb-3">
            <img src={userlogin} alt="userlogin" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>

          <hr />

          <h3>Queries</h3>
          <p>
            Users can view previous queries, mark them as important, delete them,
            and filter by all or important.
          </p>
          <div className="text-center mb-3">
            <img src={queries} alt="queries" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>

          <hr />

          <h3>Buy Me a Coffee</h3>
          <p>
            Users can donate €0.5 / €1 / €2 after submitting their email via Stripe.
          </p>
          <div className="text-center mb-3">
            <img src={stripe} alt="stripe" className="img-fluid mb-2" style={{ maxWidth: '300px' }} />
            <img src={checkout} alt="checkout" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>

          <hr />

          <h3>Admin Login</h3>
          <p>
            Admins can login via form or Google. After logging in, the Admin Panel appears in the menu.
            Admin credentials are listed in the GitHub README.
          </p>
          <p>
            Admin features:
            view and manage donations (mark as processed, send thank-you emails),
            see participants, manage users, and view user queries.
          </p>
          <div className="text-center mb-3">
            <img src={adminpanel} alt="adminpanel" className="img-fluid" style={{ maxWidth: '300px' }} />
          </div>

          <hr />

          <p className="text-center text-muted">
            This app was created as a learning project for Coding Factory 7 – AUEB – Athens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
