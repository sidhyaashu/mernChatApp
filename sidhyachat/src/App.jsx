import './App.css'
import { Routes,Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import  ChatPage  from "./pages/ChatPage";

const App=()=> {

  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage} exact />
        <Route path='/chats' Component={ChatPage}/>
      </Routes>
    </div>
  )
}

export default App 
//#11 42:17 no error
