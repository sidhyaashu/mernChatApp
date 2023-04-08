import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react'

const UserListItem = ({user,handleFunction}) => {

  return (
    <Box
    onClick={handleFunction}
    cursor= 'pointer'
    bg="#E8E8E8"
    _hover={{
        background:"#38B2AC",
        color:"white"
    }}
    w="100%"
    display="flex"
    color="black"
    px={3}
    py={2}
    alignItems="center"
    mb={2}
    borderRadius="lg"
    >
        <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
        />

        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="x5">
                 <small>{user.email}</small> 
            </Text>
        </Box>
    </Box>
  )
}

export default UserListItem
