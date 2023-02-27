
import { authService } from "fbase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    // // 이런식으로도 사용가능
    // const [form, setForm] = useState({email: '', password: ''});
    // const onChange = ({target: {name, value}}) => setForm({...form, [name]: value});

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;

            if (newAccount) {    
                data = await createUserWithEmailAndPassword(
                    authService, email, password
                );
            } else {
                data = await signInWithEmailAndPassword(
                    authService, email, password
                );
            }
            console.log(data);
        } catch(err) {
            setError(err.message);
        }
    };

    const toggleAccount = () => setNewAccount(prev => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name='email' 
                    type="text" 
                    placeholder='Email' 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name='password' 
                    type="password" 
                    placeholder='Password' 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input 
                    type="submit" 
                    value={newAccount ? 'Create Account' : 'Login'} 
                />
                {error}
            </form>

            <span onClick={toggleAccount}>
                {newAccount ? 'Login' : 'Create Account'}
            </span>
            
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;