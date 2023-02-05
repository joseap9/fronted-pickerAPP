import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/' , { 
            replace: true
        });
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr/>
            <div className="form-group">
      <label for="exampleInputEmail1" classNameName="form-label mt-4">Rut</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>

    </div>
    <br/>
            <button className="btn btn-primary"
            onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default LoginScreen