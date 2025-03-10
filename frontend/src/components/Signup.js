import React, {useState, useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import  axios from 'axios';
import Validation from './Validate'

function Signup() {
  const [values,setValues] = useState({
    name: '',
    email : '',
    password: ''
})
const navigate = useNavigate();
const [errors,setErrors] = useState({});

const handleChange = (event) => {
  setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
}

const handleSubmit = (event) => {
  event.preventDefault();
  setErrors(Validation(values));
};

useEffect(() => {
  if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', values)
          .then(res => {
              navigate('/');
          })
          .catch(err => console.log("Data not feed"));
  }
}, [errors]);


  return (
    <div className="d-flex justify-content-center bg-orange align-items-center bg- bg-primary vh-100" >
         <div className='bg-white p-3 rounded w-25'>
         <h2>Sign-Up</h2>
          <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" name='name' placeholder='Enter Name'
                onChange={handleChange} className='form-control rounded-0' />
                {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" name='email' placeholder='Enter Email'
                onChange={handleChange} className='form-control rounded-0' />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" name='password' placeholder='Enter Password'
                onChange={handleChange} className='form-control rounded-0' />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
            <p>You are agree to the terms and policies</p>
            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign in</Link>
          </form>
         </div>
    </div>
  )
}

export default Signup
