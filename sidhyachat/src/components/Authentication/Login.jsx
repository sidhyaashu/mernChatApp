import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit =async()=>{
        setLoading(true)
        if(!email || !password){
            toast({
                title:"Please fill all the feilds",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            setLoading(false)
            return;
        }

        try {
            const config ={
                Headers:{
                    "Content-type":"application/json",
                }
            }
            const { data } = await axios.post("http://127.0.0.1:5000/api/user/login",{
                email,
                password,
            },config)
            toast({
                title:"Login Successfull",
                status:"success",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })

            localStorage.setItem("userInfo",JSON.stringify(data))
            setLoading(false)
            navigate('/chats')
            
        } catch (error) {
            toast({
                title:"Error Occured..!",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })
            setLoading(false)
        }
        
    }
  return (
    <VStack spacing='5px'>

        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
            placeholder='Enter Your email'
            onChange={(e)=>setEmail(e.target.value)}
            />
        </FormControl>


        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
            type='password'
            placeholder='Enter Your Password'
            onChange={(e)=>setPassword(e.target.value)}
            />
        </FormControl>

        <Button
         colorScheme='blue'
         width='100%'
         style={{marginTop:15}}
         onClick={handleSubmit}
         isLoading={loading}
         >
            LogIn
        </Button>

        <Button
         colorScheme='red'
         variant='solid'
         width='100%'
         style={{marginTop:15}}
         onClick={()=>{
            setEmail("guest@example.com");
            setPassword("12345")
         }}
         >
            Guest User
        </Button>


    </VStack>
  )
}

export default Login
