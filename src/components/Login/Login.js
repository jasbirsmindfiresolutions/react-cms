import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';  
import { Form, Button, Container, SafeAnchor } from 'react-bootstrap';

const Login = ({ setToken }) => {

    const [state, setState] = useState({
        'email': '',
        'password': '',
        'password_confirmation': '',
        'username': ''
    }); 

    const [errors, setErrors] = useState(null);

    const [loading, setLoading] = useState(false);

    const [screenType, setScreenType] = useState('login');

    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    }

    const signupHandler = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://localhost:8000/register', state).then(res => {
                console.log(res)
                setToken('valid');
                setLoading(false);
            }).catch(err => {
                setErrors(err.response.data.errors);
                setLoading(false);
            })
        });

    
    }

    const signinHandler = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://localhost:8000/login', state).then(res => {
                console.log(res)
                setToken('valid');
                setLoading(false);
            }).catch(err => {
                setErrors(err.response.data.errors);
                setLoading(false);
            })
        });

    
    }

    let screen = '';

    if(screenType == 'login'){
        screen = (
            <>
            <Form 
                className="col-md-4 col-md-offset-4" 
                style={{margin: '0 auto', marginTop: '100px'}} 
                onSubmit={signinHandler}>
                <Form.Group controlId="email">
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.email? errors.email[0]: null}</p>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.password? errors.password[0]: null}</p>
                </Form.Group>
                <Button disabled={loading} variant="primary" type="submit">
                    {loading? 'Loading...': 'Login'}
                </Button>

            </Form>
            <Button variant="link" type="button" onClick={() => setScreenType('register')}>Not yet registered</Button>
            </>
        )
    } else if(screenType == 'register'){
        screen = (
            <>
                        <Form 
                className="col-md-4 col-md-offset-4" style={{margin: '0 auto', marginTop: '100px'}} onSubmit onSubmit={signupHandler}>
               
               <Form.Group controlId="username">
                    <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.username? errors.username[0]: null}</p>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.email? errors.email[0]: null}</p>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.password? errors.password[0]: null}</p>
                </Form.Group>
                <Form.Group controlId="passwordConfirmation">
                    <Form.Control type="password" placeholder="Password" name="password_confirmation" onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors && errors.password_confirmation? errors.password_confirmation[0]: null}</p>
                </Form.Group>
                <Button disabled={loading} variant="primary" type="submit">
                    {loading? 'Loading...': 'Register'}
                </Button>

            </Form>
            <Button variant="link" type="button" onClick={() => setScreenType('login')}>Already have an account</Button>
            </>
        )
    }

    return (
        <Container>
            {screen}
        </Container>           
    );
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;