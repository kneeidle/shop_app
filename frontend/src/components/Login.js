import React, { useState } from "react";
import Axios from "axios";
import "./Login.css"
import { connect } from 'react-redux';
import { Authorize } from '../actions/postActions';

function Login(props) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
    setRegisterUsername("");
    setRegisterPassword("");
  };
  
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      localStorage.setItem("Login", res.data);
      props.Authorize(JSON.parse(localStorage.getItem("Login")))
    });
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-row">
        <h1>Register</h1>
        <input
          placeholder="username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          onKeyDown={(event) => {if(event.keyCode === 13){
            register()
          }}}
          
        />
        <button onClick={register}>Submit</button>
      </div>

      <div className="login-row">
        <h1>Login</h1>
        <input
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          onKeyDown={(event) => {if(event.keyCode === 13){
            login()
          }}}
          
        />
        <button onClick={login}>Submit</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  Authorize: (auth) => { dispatch(Authorize(auth)); },
});

export default connect(null, mapDispatchToProps)(Login);