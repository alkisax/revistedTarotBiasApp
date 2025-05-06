# 🔮🔮 Biased Tarot Application

This project is a full-stack application built using the **MERN stack** (MongoDB, Express, React, Node.js). It combines Tarot card readings powered by GPT, secure login functionality, and donation management.

### The app is live at **[Biased Tarot Revisited](https://revistedtarotbiasapp.onrender.com)**  
📖 **Full development guide:** [instructions.md](https://github.com/alkisax/revistedTarotBiasApp/blob/main/instructions.md)  
**github rep** [github](https://github.com/alkisax/revistedTarotBiasApp/tree/main)
**App screenshots** [screenshots](https://github.com/alkisax/revistedTarotBiasApp/tree/main/appScreenshots)
**README** [README](https://github.com/alkisax/revistedTarotBiasApp/blob/main/README.MD)

- for dev testing resons you can use:
 - admin username: "alkisax", password: "123"
 - settings password: "settings"
---

## Features

### 1. **Tarot Card Readings**
- Users can draw three Tarot cards and receive a detailed reading powered by a GPT wrapper.
- The reading can be customized using a **bias setting** to navigate answers (e.g., optimistic, pessimistic, or custom).

### 2. **Secure Login**
- Secure login using **JWT (JSON Web Tokens)**.
- Role-based access control:
  - Admins can log in via Google (only pre-registered admin emails are allowed).
  - Non-admin users are restricted from accessing admin features.
- Admin panel includes:
  - Viewing donators.
  - Adding new donators.
  - Viewing donation details.

### 3. **Donation Management**
- Admins can mark donations as processed with a button.
- Automatically sends a **thank-you email** to the donator using **Nodemailer**.

### 4. **Logging and Testing**
- **Winston Logger** for backend logging.
- **Jest Tests** for backend functionality.

### 5. **API Documentation**
- Fully documented API using **Swagger**.

### 6. **Frontend**
- Built with **React** and styled using **Bootstrap**.
- Uses **React Router** for navigation between pages.

---

## Technologies Used

### Backend
- **Node.js**: Server-side runtime.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ORM for MongoDB.
- **JWT**: Secure authentication.
- **Nodemailer**: Email service for sending thank-you emails.
- **Winston**: Logging library.
- **Swagger**: API documentation.
- **Jest**: Testing framework.

### Frontend
- **React**: Frontend library for building user interfaces.
- **Bootstrap**: CSS framework for responsive design.
- **React Router**: For routing and navigation.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
2. Install dependencies for both backend and frontend:
    ```
    # Backend
    npm install

    # Frontend
    cd frontend
    npm install
    ```
3. Set up environment variables:
  * Create a .env file in the root directory with the following:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  OPENAI_API_KEY=your_openai_api_key
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  EMAIL_USER=your_email
  EMAIL_PASS=your_email_password
  ```
4. Start the application:
  ```
  # Backend
  npm run dev

  # Frontend
  cd frontend
  npm run dev
5. N.B. to run localy you have to change urls to local!!
  ```
## Usage
- Tarot Card Readings
  1. Navigate to the Tarot reading page.
  2. Draw three cards and receive a GPT-powered interpretation.
  3. Use the settings to apply a bias to the reading.
- Admin Panel
  1. Log in as an admin to access the admin panel.
  2. View, add, or delete donators.
  3. Mark donations as processed and send thank-you emails.

## API Documentation
  * Access the Swagger API documentation at ```/api-docs.```

## testing
  * Run backend tests using Jest:
  ```bash
  npm test
  ```

## file tree
```
root/
├── .env
├── .gitignore
├── instructions.md
├── README.MD
├── package.json
├── package-lock.json
├── app.js
├── server.js
├── swagger.js
├── __test__/
│   ├── admin.test.js
│   ├── login.test.js
│   ├── participant.test.js
│   ├── stripe.test.js
│   ├── tarot.test.js
│   ├── transaction.test.js
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── email.controller.js
│   ├── participant.controller.js
│   ├── stripe.controller.js
│   ├── tarot.controller.js
│   ├── transactionController.js
├── daos/
│   ├── admin.dao.js
│   ├── participant.dao.js
│   ├── transaction.dao.js
├── dist/
├── middlewares/
│   ├── verification.middleware.js
├── models/
│   ├── admins.models.js
│   ├── participant.models.js
│   ├── query.models.js
│   ├── transaction.models.js
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── email.routes.js
│   ├── participant.routes.js
│   ├── stripe.routes.js
│   ├── tarot.routes.js
│   ├── transaction.routes.js
├── services/
│   ├── auth.service.js
│   ├── gpt.service.js
│   ├── stripe.service.js
│   ├── tarot.service.js
├── utils/
│   ├── logger.js
├── frontend/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.html
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vit.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── AdminLogedInView.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Apbar.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── GoogleSuccess.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── NewParticipantForm.jsx
│   │   │   ├── ParticipantInfoForm.jsx
│   │   │   ├── Participants.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── UserDetail.jsx
│   │   ├── services/
│   │   │   ├── ProtectedRoute.jsx
│   │   ├── tarot-components/
│   │   │   ├── CardImagesTemp.jsx
│   │   │   ├── Deck1.jsx
│   │   │   ├── InnerSettings.jsx
│   │   │   ├── Language.jsx
│   │   │   ├── Question.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── TarotHome.jsx
│   │   ├── assets/
│   │   │   ├── banner.png
│   │   │   ├── hansMoneyCrop.jpg
│   │   │   ├── three_coins.png
│   │   │   ├── two coins.jpg
│   ├── public/
│   │   ├── deck1/
│   │   │   ├── 0.jpg
│   │   │   etc...
│   │   │   ├── 77.jpg
│   │   ├── images/
│   │   │   ├── small_Cretan_State.png
│   │   │   ├── small_Flag_of_Liberia
```
*this app is a combination of my previous projects BiasedTarotApp, LoginApp, StripeApp*