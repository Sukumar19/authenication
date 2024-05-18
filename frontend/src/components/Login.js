
import React, {useState, useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import  axios from 'axios';
import Validation from './Validate'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

    useEffect(() => {
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081', values)
                .then(res => {
                    navigate('/home');
                })
                .catch(err => console.log("Error at login"));
        }
    }, [errors, navigate, values]);

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100" >
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log-In</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email'
                            onChange={handleChange} name='email' className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password'
                            onChange={handleChange} name='password' className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p>You are agree to the terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
