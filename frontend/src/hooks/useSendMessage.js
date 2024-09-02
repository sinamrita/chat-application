import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useState } from "react"
import useToken from "./useToken"
import toast from "react-hot-toast"
import { addMessages } from "../redux/slice/conversationSlice"

const useSendMessage = () => {
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const {messages,selectedConversation} = useSelector(state => state.conversation)
    const token = useToken()

    const sendMessage = async (message) => {
        const config = {
            url: `${process.env.REACT_APP_SERVER_URL}/message/send/${selectedConversation?._id}`,
            method: "post",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            data : {
                message
            }
        }
    
        try{
            setLoading(true)
            const result = await axios(config);
    
            if(result.data.code === 1){
                console.log(result.data);
                dispatch(addMessages([...messages,result.data.message]))
            }else{
                throw new Error(result.data.message)
            }
            setLoading(false)
        }catch(err) {
            console.log(err)
            setLoading(false)
            toast.error(err.message)
        }
    }
    return {loading,sendMessage}
}

export default useSendMessage