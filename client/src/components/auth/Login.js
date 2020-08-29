import React, { useState } from 'react';

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const {email, password} = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit CLICKED IN LOGIN");
  };

  return (

    <div>
      <h1 className="register-center">Login</h1>
      <form onSubmit={onSubmit} className="register-center">
        <div className="form-line">
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required />
        </div>
        <div className="form-line">
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required minLength='6'/>
        </div>
        <div className="form-line">
          <input type='submit' value='Login' className="register-btn" />
        </div>
      </form>
    </div>
  )
}

export default Login;
