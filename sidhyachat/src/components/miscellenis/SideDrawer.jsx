import { useState } from 'react'
import {
  Box,
  Button,
  Tooltip ,
  Text, 
  Menu, 
  MenuButton, 
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Divider,
  useToast,
} from '@chakra-ui/react';
import {useDisclosure} from "@chakra-ui/hooks"
import { ChatState } from './../../contex/ChatProvider';
import { 
  BellIcon, 
  ChevronDownIcon,
} from "@chakra-ui/icons";
import ProfileModal from './ProfileModal';
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserListItem';


const SideDrawer = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen,onOpen,onClose } = useDisclosure()

  const { user } = ChatState()

  const logOutHandler =()=>{
    localStorage.removeItem("userInfo")
    navigate('/')
  }


  const toast = useToast()

  const handleSearch =async()=>{
    if(!search){
      toast({
        title:"Please something",
        status:"warning",
        duration:1000,
        isClosable:true,
        position:"top-left"
      })
      return;
    }

    try {
      setLoading(true)

      const config={
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`,config)

      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title:"Error Occured! :(",
        description:"Failed to load the search Result",
        status:"error",
        duration:3000,
        isClosable:true,
        position:"bottom-left"
      })
      setLoading(false)
    }

  }

  const accessChat =(id)=>{

  }


  return (
    <>
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    >
      <Tooltip 
      label="Search User To Chat"
      hasArrow
      placement='bottom-end'
      >
        <Button variant="ghost" onClick={onOpen}>
          <i class="fa-solid fa-magnifying-glass"></i>
          <Text display={{base:"none",md:"flex"}} px="4" >
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl"fontWeight="bold" >Sidhya Talk</Text>

      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize='2xl' m={1} />
          </MenuButton>

          {/* <MenuList></MenuList> */}


        </Menu>
          
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm" cursor="pointer" name={user.name} src={user.src}/>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user} >
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider/>
            <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>

    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" >Search User</DrawerHeader>
        <Divider/>
        <DrawerBody>
        <Box display="flex" pb={2}>
          <Input 
          placeholder='Search by name or email'
          mr={2}
          value={search}
          onChange={e=>setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
        {
          loading ?(<ChatLoading/>):(
            searchResult?.map((user)=>(
              <UserListItem
              key={user._id}
              user={user}
              handleFunction={()=>accessChat(user._id)}
              />
            ))
          )
        }
      </DrawerBody>
      </DrawerContent>
      
    </Drawer>
    </>
  )
}

export default SideDrawer
