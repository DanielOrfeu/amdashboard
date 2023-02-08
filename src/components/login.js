import { auth } from "@/firebase/client";
import { FB_ERRORS } from "@/firebase/errors";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Alert,
  AlertIcon,
  FormHelperText,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Router from "next/router";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import LoadingSpinner from "./loadingSpinner";

function Login() {
  const [emailError, setemailError] = useState("");
  const [login, user, loadingSignin, errorSignin] =
    useSignInWithEmailAndPassword(auth);

  const [sendResetPW, sendingResetPW, errorResetPW] =
    useSendPasswordResetEmail(auth);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      login(values.email, values.password).then((res) => {
        if (res?.user) {
          Router.push("/");
        }
      });
    },
  });

  const handleSendResetPW = () => {
    if (!formik.values.email) {
      setemailError("Para recuperar a senha, preencha o email!");
      setTimeout(() => {
        setemailError("");
      }, 2500);
    } else {
      sendResetPW(formik.values.email)
        .then((res) => {
          if (!res && errorResetPW) {
            toast({
              title: "Erro ao enviar email de redefinição de senha.",
              description: FB_ERRORS[errorResetPW.code] || errorResetPW?.code,
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
          if (res) {
            toast({
              title: "Email de redefinição de senha enviado.",
              description:
                "Confira a caixa de entrada ou o spam do seu e-mail.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          console.log("aqui");

          console.log({ err });
        });
    }
  };

  return (
    <VStack flex={1}>
      <Stack
        as={"form"}
        w={[300, 400, 500, 700]}
        align={"center"}
        justify={"center"}
        gap={4}
        onSubmit={formik.handleSubmit}
      >
        <Heading>Login:</Heading>
        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            name={"email"}
            type={"email"}
            placeholder={"email@email.com"}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            name={"password"}
            type={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {sendingResetPW ? (
            <FormHelperText>
              <LoadingSpinner />
            </FormHelperText>
          ) : (
            <FormHelperText
              alignSelf={"flex-end"}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSendResetPW();
              }}
            >
              <Text>Esqueceu a senha?</Text>
            </FormHelperText>
          )}
        </FormControl>

        {(errorSignin?.code || emailError) && (
          <Alert status="error">
            <AlertIcon />
            {FB_ERRORS[errorSignin?.code] || errorSignin?.code || emailError}
          </Alert>
        )}
        <Button isLoading={loadingSignin} w={"100%"} type={"submit"}>
          Entrar
        </Button>
      </Stack>
    </VStack>
  );
}

export default Login;
