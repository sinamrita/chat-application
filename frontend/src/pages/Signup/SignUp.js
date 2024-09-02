import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import useSignUp from "../../hooks/useSignUp";
import Loading from "../../components/Loading/Loading";

const SignUp = () => {
  
  const [inputs, setInputs] = useState({
    full_name: "",
    gender: "",
    password: "",
    confirm_password: "",
    username: ""
  });
  const { signup, loading } = useSignUp();

  const handleGenderChange = (gender) => {
    setInputs({
      ...inputs,
      gender: gender
    });
  };

  const handleInputChanges = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1>Sign up</h1>
            <h1>Chat App</h1>
          </div>
          <div className={styles.inputFields}>
            <label>Full name</label>
            <input
              type="text"
              name="full_name"
              value={inputs.full_name}
              onChange={handleInputChanges}
              placeholder="Full name"
            />
          </div>
          <div className={styles.inputFields}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleInputChanges}
              placeholder="Username"
            />
          </div>
          <div className={styles.inputFields}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChanges}
              placeholder="Password"
            />
          </div>
          <div className={styles.inputFields}>
            <label>Confirm Password</label>
            <input
              type="text"
              name="confirm_password"
              value={inputs.confirm_password}
              onChange={handleInputChanges}
              placeholder="Confirm Password"
            />
          </div>
          <Checkbox
            handleGenderChange={handleGenderChange}
            value={inputs.gender}
          />
          <div className={styles.haveAnAccount}>
            <Link to="/">Already have an account?</Link>
          </div>
          {
            loading ?  
                <Loading />
               : 
            <div className={styles.btn}>
                <button onClick={signupHandler}>Signup</button>
            </div>
            }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
