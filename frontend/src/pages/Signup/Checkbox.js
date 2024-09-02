import React from "react";
import styles from "./SignUp.module.css";

const Checkbox = ({ handleGenderChange, value }) => {
  return (
    <>
      <div className={styles.checkbox}>
        <div>
          <label>Male</label>
          <input
            checked={value === "Male"}
            onChange={() => handleGenderChange("Male")}
            type="radio"
            name="gender"
          />
        </div>
        <div>
          <label>Female</label>
          <input
            checked={value === "Female"}
            onChange={() => handleGenderChange("Female")}
            type="radio"
            name="gender"
          />
        </div>
      </div>
    </>
  );
};

export default Checkbox;
