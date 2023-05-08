import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

interface ConfirmationDialogProps {
  title: string;
  body: React.ReactNode;
  showDialog: boolean;
  loading?: boolean;
  confirmationButtonText?: string;
  colorScheme?: string;
  isForm?: boolean;
  formId?: string;
  onConfirm: () => void;
  onCloseDialog: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  body,
  showDialog,
  loading,
  confirmationButtonText,
  onConfirm,
  isForm,
  formId,
  colorScheme,
  onCloseDialog,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (showDialog) {
      onOpen();
    }
  }, [showDialog, onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onCloseDialog();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              onCloseDialog();
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            colorScheme={colorScheme}
            isLoading={loading}
            type={isForm ? 'submit' : 'button'}
            form={formId}
            onClick={() => {
              onCloseDialog();
              onConfirm();
            }}
          >
            {confirmationButtonText || 'Confirm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationDialog;
