import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

function SideMenu({ closeMenu } = props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = () => {
    onClose();
    closeMenu();
  };

  return (
    <Drawer
      placement={"left"}
      onClose={() => {
        handleClose();
      }}
      isOpen={isOpen}
      size={["full", "full", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>A.M. Dashboard</DrawerHeader>
        <DrawerBody>
          <Text>Dashboard</Text>
          <Text>Clientes</Text>
          <Text>Atendimentos</Text>
          <Text>Configurações</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default SideMenu;
