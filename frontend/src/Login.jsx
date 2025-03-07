import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import custom CSS for styling

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/adminlogin', values);
            if (res.data.Status === 'Success') {
                navigate('/');
            } else {
                setError(res.data.Error);
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage' style={{ background: 'linear-gradient(to right, #0000FF, #FF00FF)' }}>
            <div className='login-background container'>
                <div className='row justify-content-center align-items-center min-vh-100'>
                    <div className='col-md-6'>
                        <div className='card p-4'>
                            <div className='text-danger mb-3'>{error && error}</div>
                            <h2 className='text-center mb-4'>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" placeholder='Enter Email' name='email' className='form-control border border-primary'
                                        onChange={e => setValues({ ...values, email: e.target.value })} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" placeholder='Enter Password' name='password' className='form-control border border-primary'
                                        onChange={e => setValues({ ...values, password: e.target.value })} />
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

);

};

export default Login;
