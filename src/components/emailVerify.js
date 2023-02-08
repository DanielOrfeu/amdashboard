import { auth } from "@/firebase/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/react";
import { FB_ERRORS } from "@/firebase/errors";

function EmailVerify() {
  const toast = useToast();
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(onOpen, []);
  const sizes = ["xs", "sm", "md", "lg", "xl", "full"];
  return (
    <Modal size={["full", "xl"]} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verifique seu email!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Para ter acesso à recuperação de senha, criação de usuários e outros
            itens, por favor verifique seu e-mail.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={sending}
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              await sendEmailVerification().then((res) => {
                if (error) {
                  console.log({ error });
                  toast({
                    title: "Erro ao enviar email de verificação.",
                    description:
                      FB_ERRORS[error.code] || FB_ERRORS["generic-error"],
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  });
                } else if (res) {
                  toast({
                    title: "Email de verificação enviado.",
                    description:
                      "Confira a caixa de entrada ou o spam do seu e-mail.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  onClose();
                }
              });
            }}
          >
            Verificar email
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Verificar mais tarde
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EmailVerify;
