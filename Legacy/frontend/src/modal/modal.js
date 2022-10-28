import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import SelectedTokens from "../templates/selectedTokens";

const TokenModal = ({ isOpen, onClose, header, handleProceed, children, tokens }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SelectedTokens tokens={tokens} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bgColor="brand.teal" color="brand.white" onClick={handleProceed}>Proceed</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TokenModal;
