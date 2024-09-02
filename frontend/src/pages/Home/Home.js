import React from 'react'
import styles from "./Home.module.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/MessageContainer/MessageContainer'

const Home = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    </div>
  )
}

export default Home