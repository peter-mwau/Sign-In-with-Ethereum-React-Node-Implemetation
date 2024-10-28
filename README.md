# Sign-In with Ethereum (SIWE) Project

This project enables decentralized authentication through **Sign-In with Ethereum (SIWE)**, allowing users to securely sign in using their Ethereum account. This approach leverages public-key cryptography for identity verification, enhanced with JWTs for session management. The project consists of two primary components: a frontend for user interaction and a backend that handles authentication, JWT issuance, and data verification.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installing Dependencies](#installing-dependencies)
5. [Running the Application](#running-the-application)
6. [Project Walkthrough](#project-walkthrough)
7. [Technologies Used](#technologies-used)
8. [Understanding Sign-In with Ethereum (SIWE)](#understanding-sign-in-with-ethereum-siwe)
9. [Future Improvements](#future-improvements)

---

## Project Overview

This Sign-In with Ethereum (SIWE) project implements a decentralized, secure, and user-friendly method for users to authenticate with Ethereum addresses. SIWE utilizes Ethereum’s public/private key cryptography to create secure, signed messages that enable trusted logins, eliminating the need for traditional usernames and passwords.

### Purpose

The purpose of this project is to provide a seamless and secure login method by:
- Verifying user identities through their Ethereum addresses.
- Using JWTs (JSON Web Tokens) for secure, session-based access to application resources.
- Allowing users to securely access services without revealing sensitive information.

---

## Features

- **Decentralized Login**: Users authenticate using their Ethereum address, eliminating reliance on traditional credentials.
- **Message Signing**: Utilizes the SIWE protocol for message generation and signing.
- **JWT Integration**: Ensures session-based security and resource access control.
- **ENS Profile Support**: Optionally displays user’s ENS profile information (e.g., avatar, email).
- **Built with Security in Mind**: Ensures data integrity with public-private key verification.

---

## Project Structure

The project is structured into two main folders:

- Frontend/
- Backend/

```

- **Frontend**: Handles user interaction and connects to the wallet, sending signed messages to the backend.
- **Backend**: Node.js/Express server that verifies signatures, manages JWT tokens, and maintains secure sessions.

---

## Getting Started

### Cloning the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/yourusername/siwe-authentication.git
cd siwe-authentication
```

###Installing Dependencies
- Install the required dependencies for both frontend and backend:

- Frontend:
```
cd Frontend
npm install
```

- Backend:
```
cd Backend
npm install
```

###Running the Application
- Frontend
To start the frontend with Vite in development mode:
```
npm run dev
```
- Backend
To start the backend server with Node.js/Express:
```
npm start
```

###Testing
- Open your browser and navigate to the frontend's development server, typically at http://localhost:5173.
- Connect your wallet and follow the login prompt.
- Upon signing in, a JWT will be generated and stored, allowing authenticated access to protected routes.

##Project Walkthrough
###1. User Login with Ethereum
- The frontend prompts the user to connect their wallet (e.g., MetaMask).
- After connecting, a unique nonce is requested from the backend.
- A SIWE message is created, containing the nonce, domain, and other identifying data.
- The message is signed by the user’s wallet and sent to the backend.
###2. Signature Verification & JWT Issuance
- The backend verifies the signed message using the SIWE library.
- Upon successful verification, a JWT is generated and issued to the frontend.
- The JWT is stored securely in local storage or cookies, allowing the frontend to access authenticated resources.
###3. Accessing User Information
- The frontend can optionally retrieve and display ENS profile data (avatar, email, etc.) tied to the Ethereum address.
- User data is periodically updated to reflect any changes in profile or authentication status.
  
##Technologies Used
- **Frontend**: Vite, React, Tailwind CSS
- **Backend**: Node.js, Express, SIWE Library, JWT for secure session management
- **Ethereum Wallet Integration**: Metamask, Ethers.js
- **ENS Data Support**: (Optional) Display ENS profiles linked to the Ethereum address.

##Understanding Sign-In with Ethereum (SIWE)
###How SIWE Works
- **Decentralized Identifiers**: Ethereum addresses act as decentralized identifiers (DIDs) in SIWE, allowing users to control their identities without a central authority.
- **Public/Private Key Verification**: Ethereum’s cryptographic protocol relies on users signing messages with their private key. The signed message, verified using the corresponding public key, proves ownership of the Ethereum address.
- **Session-Based Authentication with JWT**: To maintain authenticated sessions, the backend generates JWTs upon successful login. JWTs are signed and contain essential user info, allowing for secure resource access.

##Security Measures
- **Message Nonces**: Each SIWE message includes a unique nonce, preventing replay attacks.
- **Signature Validation**: The backend checks the signature to verify that the request originates from the claimed Ethereum address.
- **Token Expiration**: JWTs include expiration times to limit session duration, enhancing security.

##Future Improvements
- This project could be further enhanced by adding:

- **ENS Profile Management**: Enable users to update their ENS profiles directly through the app.
- **OAuth-Like SIWE Flows**: Add support for OAuth-style flows to simplify SIWE adoption across multiple applications.
- **Role-Based Access Control**: Implement role-based permissions in the backend for more granular access control.
- **Advanced DID Support**: Integrate DID-based protocols like Ceramic or IDX for more comprehensive decentralized identity management.
- **Enhanced User Experience**: Add alerts, notifications, or a profile dashboard to improve interaction with SIWE features.

