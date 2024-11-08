import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";


const url = process.env.REACT_APP_API_URL

export default function UserProvider({children}) {
    const userFromSessionStorage = sessionStorage.getItem('user')
    const [user, setUser] = useState(userFromSessionStorage? JSON.parse(userFromSessionStorage): {email: '', password: ''})
    
    const signUp = async (email, password) => {
        const data = { email, password };
        const headers = { headers: { 'Content-Type': 'application/json' } };
        try {
            await axios.post(url + '/user/register', data, headers); 
            setUser({ email: '', password: '' });
        } catch (error) {
            throw error;
        }
    }
    
    const signIn = async (email, password) => {
        const data = { email, password };
        const headers = { headers: { 'Content-Type': 'application/json' } };
        try {
            const response = await axios.post(url + '/user/login', data, headers); 
            setUser(response.data);
            sessionStorage.setItem("userToken", response.data.token);
        } catch (error) {
            setUser({ email: '', password: '' });
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{user, setUser, signUp, signIn}}>
            { children }
        </UserContext.Provider>
    )
}