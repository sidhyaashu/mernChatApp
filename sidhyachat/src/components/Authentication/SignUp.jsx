import React,{useState} from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack
} from '@chakra-ui/react'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");


    const postDetails =(pics)=>{

    }


    const handleSubmit =()=>{
        
    }


  return (
    <VStack spacing='5px'>

        
        <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
            placeholder='Enter Your name'
            onChange={(e)=>setName(e.target.value)}
            />
        </FormControl>


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


        <FormControl id="cpassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input 
            type='password'
            placeholder='Confirm Password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
        </FormControl>

        <FormControl id="pic" isRequired>
            <FormLabel>Picture</FormLabel>
            <Input 
            type='file'
            accept='image/*'
            placeholder='Upload your picture'
            onChange={(e)=>postDetails(e.target.files[0])}
            />
        </FormControl>

        <Button
         colorScheme='blue'
         width='100%'
         style={{marginTop:15}}
         onClick={handleSubmit}>
            SignUp
         </Button>


    </VStack>
  )
}

export default SignUp
