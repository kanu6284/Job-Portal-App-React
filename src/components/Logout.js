// components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase.config";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate('/login'); // Redirect to login page after sign out
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        alert(`Error signing out: ${error.message}`);

      });
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-5 border rounded bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default Logout;