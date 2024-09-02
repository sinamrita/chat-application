import { useEffect, useState } from "react"
import useToken from "./useToken"
import axios from "axios"
import toast from "react-hot-toast"

const useGetConversation = () => {

    const [loading,setLoading] = useState(false)
    const [conversation,setConversation] = useState([])
    const token = useToken()

    useEffect(() => {
        const getConversation = async () => {
            const config = {
                url: `${process.env.REACT_APP_SERVER_URL}/user/get_users`,
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }
            try{
                setLoading(true)
                const result = await axios(config);
                if(result.data.code === 1){
                    setConversation(result.data.users)
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
        getConversation()
    },[])

    return {conversation,loading} 
}

export default useGetConversation