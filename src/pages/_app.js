import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import Head from "next/head";
import Header from "@/components/header";
import Login from "@/components/login";
import theme from "@/styles/theme";
import LoadingSpinner from "@/components/loadingSpinner";

const myTheme = extendTheme(theme);

const GlobalStyle = ({ children }) => (
  <>
    <Head>
      <title>A.M. Dashboard</title>
      <meta
        name="description"
        content="Site de gestão administrativa da empresa A. M. Estética e Massoterapia."
      />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <CSSReset />
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
        }
      `}
    />
    {children}
  </>
);

export default function App({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <ChakraProvider theme={myTheme}>
      <VStack h={"100vh"} minW={"100vw"} p={6} gap={6}>
        <GlobalStyle />
        <Header user={user || null} />
        <Flex flex={1} w="100%">
          {loading ? (
            <LoadingSpinner />
          ) : user ? (
            <Component {...pageProps} user={user} />
          ) : (
            <Login />
          )}
        </Flex>
      </VStack>
    </ChakraProvider>
  );
}
