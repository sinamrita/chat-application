import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"
import useToken from "../hooks/useToken"

const useLogout = () => {

    const [loading,setLoading] = useState(false)
    const {setUser} = useAuthContext()
    const token = useToken()
    
    const logout = async () => {
        const config = {
            url: `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
            method: "get",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        }

        try{
            setLoading(true)
            const result = await axios(config);

            if(result.data.code === 1){
                localStorage.removeItem('chat-user')
                localStorage.removeItem('chat-token')
                setUser(null)
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
    return {logout,loading}
}

export default useLogout