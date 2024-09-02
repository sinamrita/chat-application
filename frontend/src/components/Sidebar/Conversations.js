import React from 'react'
import styles from "./Sidebar.module.css"
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'

const Conversations = () => {

  const {loading,conversation} = useGetConversation()
  
  return (
    <div className={styles.conversations}>
      {
        conversation.map(data => {
          return(
            <Conversation 
              profile={data.profile}
              name={data.full_name}
              conversation = {data}
              key={data._id}
            />
          )
        })
      }
    </div>
  )
}

export default Conversations