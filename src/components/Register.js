import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered: ", user);
        navigate('/'); // navigate to home page upon successful registration
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering: ", errorCode, errorMessage);
        alert(`Error registering: ${errorMessage}`);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        >
          Register
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-gray-500 py-2 px-4 rounded hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;
