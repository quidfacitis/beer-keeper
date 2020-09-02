import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, error, clearErrors, login } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // redirect to home page
    }
    if (error === "Invalid credentials") {
      alert('Invalid credentials!');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit CLICKED IN LOGIN");
    login({
      email,
      password
    });
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
