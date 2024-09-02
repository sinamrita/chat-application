import React from 'react'
import ReactLoading from "react-loading"

const Loading = () => {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
        <ReactLoading width={35} height={35} type='bars' color="#fff"/>
    </div>
  )
}

export default Loading