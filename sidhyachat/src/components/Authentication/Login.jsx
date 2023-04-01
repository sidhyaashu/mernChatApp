import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =()=>{
        
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
