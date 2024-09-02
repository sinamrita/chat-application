import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const [inputs, setInputs] = useState({
    password: "",
    username: "",
  });

  const { loading, login } = useLogin();
  const handleInputChanges = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1>Login</h1>
            <h1>Chat App</h1>
          </div>
          <div className={styles.inputFields}>
            <label>Username</label>
            <input
              type='text'
              placeholder='Enter username'
              name='username'
              value={inputs.username}
              onChange={handleInputChanges}
            />
          </div>
          <div className={styles.inputFields}>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              value={inputs.password}
              onChange={handleInputChanges}
            />
          </div>
          <div className={styles.haveAnAccount}>
            <Link to='/signup'>Don't have an account?</Link>
          </div>
          {
            loading ?  
                <Loading />
               : 
            <div className={styles.btn}>
                <button onClick={loginHandler}>Login</button>
            </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Login;
