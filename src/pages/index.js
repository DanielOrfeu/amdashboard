import EmailVerify from "@/components/emailVerify";
import { auth, firestore } from "@/firebase/client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home({ user } = props) {
  return (
    <Flex>
      <Heading>Olá {user.displayName || user.email}!</Heading>
      {!user?.emailVerified && <EmailVerify />}
      <Button onClick={() => {}}>Ttest</Button>
    </Flex>
  );
}
