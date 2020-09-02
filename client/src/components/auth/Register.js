import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit CLICKED IN REGISTER");
    if (password !== password2) {
      alert("Passwords do not match!");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (

    <div>
      <h1 className="register-center">Register</h1>
      <form onSubmit={onSubmit} className="register-center">
        <div className="form-line">
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required />
        </div>
        <div className="form-line">
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required />
        </div>
        <div className="form-line">
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required minLength='6'/>
        </div>
        <div className="form-line">
          <label htmlFor='password2'>Confirm password</label>
          <input type='password' name='password2' value={password2} onChange={onChange} required minLength='6'/>
        </div>
        <div className="form-line">
          <input type='submit' value='Register' className="register-btn" />
        </div>
      </form>
    </div>
  )
}

export default Register;
