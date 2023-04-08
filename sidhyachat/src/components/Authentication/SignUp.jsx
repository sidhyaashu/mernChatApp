import React,{useState} from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()




    // https://api.cloudinary.com/v1_1/sidhya
    //upload photos in cloudnary
    const postDetails =(pics)=>{
        setLoading(true)
        if(pics === undefined){
        toast({
          title: 'Account created.',
          description: "Please Selece an Image",
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position:"bottom"
        })
        return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData()
            data.append('file',pics)
            data.append("upload_preset","chatapp")
            data.append("cloud_name","sidhya")
            fetch("https://api.cloudinary.com/v1_1/sidhya/image/upload",{
                method:"post",
                body:data

            }).then((res)=> res.json())
            .then((data)=>{
                setPic(data.url.toString())
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
                setLoading(false)
            })
        }else{
        toast({
          title: 'Account created.',
          description: "Please Selece an Image",
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position:"bottom"
        })
        setLoading(false)
        return;
        }
    }


    const handleSubmit =async()=>{
        setLoading(true)
        if(!name || !email || !password || !confirmPassword){
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
        if(password !== confirmPassword){
            toast({
                title:"Password do not matched",
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
            const { data } = await axios.post("http://127.0.0.1:5000/api/user",{
                email,
                name,
                pic,
                password,
            },config)
            toast({
                title:"Registration Successfull",
                status:"success",
                duration:3000,
                isClosable:true,
                position:"bottom"
            })

            localStorage.setItem("userInfo",JSON.stringify(data))
            setLoading(false)
            navigate('/')
            
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
         isLoading={loading}
         onClick={handleSubmit}>
            SignUp
         </Button>


    </VStack>
  )
}

export default SignUp
