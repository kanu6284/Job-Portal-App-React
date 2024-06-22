import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in: ", user);
        navigate('/home'); // navigate to home page upon successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in: ", errorCode, errorMessage, email, credential);
        alert(`Error signing in with Google: ${errorMessage}`);
      });
  };

  const handleEmailPasswordLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: ", user);
        navigate('/'); // navigate to home page upon successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in: ", errorCode, errorMessage);
        alert(`Error signing in: ${errorMessage}`);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {!showEmailForm ? (
          <>
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
            >
              Login with Email
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login with Google
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleEmailPasswordLogin}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
            >
              Login with Email
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login with Google
            </button>
            <button
              onClick={() => setShowEmailForm(false)}
              className="w-full text-gray-500 py-2 px-4 rounded hover:underline mt-4"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
