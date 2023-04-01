import React from 'react'
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels
} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent >
      <Box
      display="flex"
      p="3"
      bg="white"
      justifyContent="center"
      w='100%'
      m="40px 0px 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="work sans" color="black" >Rama Talk Center</Text>
      </Box>
      <Box 
      bg="white"
      p={4} 
      borderRadius="lg"
      borderWidth="1px"
      w="100%"
      >
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width="50%"  >Login</Tab>
            <Tab width="50%"  >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><SignUp/></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
