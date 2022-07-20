import { Stack } from "@mui/material";

export const ContainerContentCard = ({ children }) => {
  return (
    <>
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        spacing={2}
      >
        {children}
      </Stack>
    </>
  );
};
