const useToken = () => {
    let token = localStorage.getItem('chat-token')
    if(token){
        token = token.slice(1, -1);
    }
    return token
}

export default useToken