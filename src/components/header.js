import { auth } from "@/firebase/client";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Icon,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import Router from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";
import { FaSignOutAlt } from "react-icons/fa";
import SideMenu from "./sideMenu";
import { useState } from "react";

function Header(props) {
  const [openMenu, setopenMenu] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [signOut, loadingSO, errorSO] = useSignOut(auth);

  return (
    <Box w="100%">
      <HStack gap={2} alignItems={"center"} justifyContent={"space-between"}>
        <HStack>
          {openMenu && (
            <SideMenu
              closeMenu={() => {
                setTimeout(() => {
                  setopenMenu(false);
                }, 500);
              }}
            />
          )}
          <Image
            _hover={{
              cursor: "pointer",
            }}
            boxSize={["40px", "50px"]}
            src="/favicon.ico"
            onClick={() => {
              setopenMenu(true);
            }}
          />
          <Text fontSize={["l", "xl"]} display={["none", "block"]}>
            A. M. Dashboard
          </Text>
        </HStack>
        <HStack>
          {colorMode == "light" ? (
            <MoonIcon
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                toggleColorMode();
              }}
            />
          ) : (
            <SunIcon
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                toggleColorMode();
              }}
            />
          )}
          {props?.user && (
            <IconButton
              isLoading={loadingSO}
              justifySelf={"flex-end"}
              onClick={async () => {
                const success = await signOut();
                if (success) {
                  Router.push("/");
                }
              }}
            >
              <Icon as={FaSignOutAlt} />
            </IconButton>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}

export default Header;
