import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [state, setState] = useState({
        'email': '',
        'password': ''
    }); 

    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    }
    
    
    const signinHandler = (e) => {
        e.preventDefault();
         axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://localhost:8000/login', state).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        });

    }

    return (
        <div>
            <div><input type="text" placeholder="Email" name="email" onChange={handleChange} /></div>
            <div><input type="password" placeholder="Password" name="password" onChange={handleChange} /></div>
            <div><input type="submit" value="Signin" onClick={signinHandler} /></div>
        </div>
    )
}

export default Login;