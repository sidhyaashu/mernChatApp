import { Box } from "@chakra-ui/react"
import { ChatState } from "../contex/ChatProvider"
import SideDrawer from "../components/miscellenis/SideDrawer"
import MyChats from "../components/miscellenis/MyChats"
import ChatBox from "../components/miscellenis/ChatBox"


const ChatPage = () => {
  const { user } = ChatState()

  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display= 'flex'
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
      
    </div>
  )
}

export default ChatPage
