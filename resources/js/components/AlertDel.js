import React,{useState} from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,Button
  } from "@chakra-ui/react"

const AlertDel = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    //const cancelRef = React.useRef()

    return (
      <>
        <Button colorScheme="red" onClick={() => setIsOpen(true)}>
          {props.btnmsg}
        </Button>

        <AlertDialog
          isOpen={isOpen}
        //   leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.btnmsg}
              </AlertDialogHeader>

              <AlertDialogBody>
                {/* Are you sure? You can't undo this action afterwards. */}
                {props.msg}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button  onClick={onClose}>
                  Нет
                </Button>
                <Button colorScheme="red" onClick={props.handleVesli} ml={3}>
                  Да
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}

export default AlertDel
