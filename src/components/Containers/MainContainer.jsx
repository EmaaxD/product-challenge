import { Container } from "@mui/material";

export const MainContainer = ({ children }) => {
  return (
    <>
      <Container maxWidth="md">{children}</Container>
    </>
  );
};
