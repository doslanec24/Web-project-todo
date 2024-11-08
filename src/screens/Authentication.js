
import { Link, useNavigate } from 'react-router-dom' 
import './Authentication.css'
import React from 'react'
import { useUser } from '../context/useUser'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
});



export default function Authentication({authenticationMode}) {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {user,setUser, signUp, signIn}=useUser()
    const navigate=useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            if(authenticationMode=== AuthenticationMode.Register){
                await signUp(email,password)
                navigate('/signin')
            }  else{
                await signIn(email,password)
                navigate("/")
            }
        }catch(error){
            const message = error.response && error.response.data ? error.response.data.error:error
            alert(message)
        }
    }

    return(
        <div>
            <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
                    </div>
                    <div>
                        <Link  to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                            {authenticationMode === AuthenticationMode.Login? 'No account? Sign up' : 'Already signed up? Sign in'}
                        </Link>
                    </div>
                </form>
            </div>

    )
}
