// import  {useNavigate}  from "react-router-dom";
import React ,{useState,useEffect} from 'react'
import { createContext ,useContext} from "react"


const ChatContex = createContext()

const ChatProvider =({children})=>{
    // const navigate = useNavigate()

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo){
            // navigate("/")
        }
    }, []); //navigate

    return (
    <ChatContex.Provider value={{ user , setUser,selectedChat, setSelectedChat ,chats, setChats}} >
        {children}
    </ChatContex.Provider>
    )
}

export const ChatState =()=>{
    return useContext(ChatContex);
}

export default ChatProvider