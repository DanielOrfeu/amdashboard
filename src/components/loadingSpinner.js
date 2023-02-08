import { Spinner, Stack } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Stack
      justifyContent={"center"}
      w={"100%"}
      alignSelf={"center"}
      direction={"row"}
    >
      <Spinner size={"xl"} />
    </Stack>
  );
}

export default LoadingSpinner;
