import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [RegisterUsername, setRegisterUsername] = useState('');
  const [RegisterPassword, setRegisterPassword] = useState('');
  const [LoginUsername, setLoginUsername] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');
  const [Data, setData] = useState(null);

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: RegisterUsername,
        password: RegisterPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/register',
    }).then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: LoginUsername,
        password: LoginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div>
        <h1>Register</h1>
        <input placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)} />
        <input placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)} />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={(e) => setLoginUsername(e.target.value)} />
        <input placeholder="password" onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>User</h1>
        <button onClick={getUser}>Submit</button>
        {
            Data ? (
              <h1>
                Welcome Back
                {Data.username}
              </h1>
            ) : null
        }

      </div>
    </div>
  );
}
