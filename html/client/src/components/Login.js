import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('success');
  }

  return (
    <div className="container">
      <h1>Admin login</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" name='email' value={email} onChange={onChange} />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" name='password' value={password} onChange={onChange} />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

        <div className="text-center">
          <p>Not a member? <Link to="/Adminregister">Register</Link></p>
          <p>or sign up with:</p>
          
        </div>
      </form>
    </div>
  )
};

export default Login;
