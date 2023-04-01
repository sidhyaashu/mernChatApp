import React from 'react'
import axios from 'axios'

const ChatPage = () => {
  const fetchChat =async()=>{
    const data = await axios.get('/api/chat')
  }
  return (
    <div>
      chatPage
    </div>
  )
}

export default ChatPage
