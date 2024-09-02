import React from 'react'
import styles from "./Sidebar.module.css"
import { IoSearch } from "react-icons/io5";
import useGetConversation from '../../hooks/useGetConversation';

const SearchInput = () => {

  const {loading,conversation} = useGetConversation()
  
  return (
    <div className={styles.searchInput}>
        <div className={styles.input}>
            <input type='text' placeholder='Search...' />
        </div>
        <div className={styles.icon}>
            <IoSearch />
        </div>
    </div>
  )
}

export default SearchInput