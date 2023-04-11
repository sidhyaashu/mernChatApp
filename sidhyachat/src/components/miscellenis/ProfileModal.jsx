import { ViewIcon } from '@chakra-ui/icons'
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Button, Image, Text } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/hooks"
import React from 'react'


const ProfileModal = ({user,children}) => {
    const { isOpen,onOpen,onClose } = useDisclosure()
    // console.log(`Profile model user `,user)
    
  return (
    <>
    {children?(
        <span onClick={onOpen} >{children}</span>
    ):(
        <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
    )}

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="30px"
          display="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          >
            <Image
            borderRadius="full"
            boxSize="100px"
            src={user.pic}
            alt={user.name}
            objectFit="cover"
            />
            <Text fontSize={{base:"18px",md:"25px"}}>
                Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
