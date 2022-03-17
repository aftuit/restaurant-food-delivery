import React from 'react'
import Login from './Login/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import { useToken } from "../../Context/loginContext";
const AuthAdminPanel = () => {

    const [token] = useToken();
    if (token) {
        return <AdminPanel />
    } else {
        return <Login />
    }
}

export default AuthAdminPanel