import React from 'react'
import styles from "./Sidebar.module.css"
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {

  const {logout,loading} = useLogout()

  const logoutHandler = async (e) => {
    e.preventDefault()
    await logout()
  }

  return (
    <div className={styles.logoutBtn}>
      <button onClick={logoutHandler} className={styles.btn}>
        <BiLogOut/>
      </button>
    </div>
  )
}

export default LogoutButton