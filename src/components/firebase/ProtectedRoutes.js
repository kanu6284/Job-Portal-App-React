// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContex';

const PrivateRoute = ({ element: Component }) => {
    const { currentUser } = useAuth();

    return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;