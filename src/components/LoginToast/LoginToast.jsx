import React, { useState } from 'react'
import {login} from '../../functions/apiFunctions'
import {Close} from '@mui/icons-material';

const LoginToast = ({handleClosed}) => {   
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        login(user, password);
        handleClosed();
    }

    return (
        <div className='toast-wrapper'>
            <div className='toast'>
                <div className='toast-header'>
                    <button className='toast-button' onClick={() => handleClosed()}><Close/></button>
                </div>

                <p className='toast-title centered-text'>Login is required to perform this action</p>

                <input 
                    type='text' 
                    value={user} 
                    spellCheck={false} 
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="User"></input>

                <input 
                    type='password' 
                    value={password} 
                    spellCheck={false} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"></input>

                <div className='toast-footer'>
                    <button className='toast-button' onClick={() => handleSubmit()}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default LoginToast;