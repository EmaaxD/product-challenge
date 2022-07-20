import { Box } from "@mui/material";

export const ContainerContent = ({ children }) => {
  return (
    <>
      <Box
        bgcolor="white"
        px={5}
        py={3}
        borderRadius={5}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      >
        {children}
      </Box>
    </>
  );
};
