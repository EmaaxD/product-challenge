import { Box } from "@mui/material";

export const CircleColor = ({ color }) => {
  return (
    <>
      <Box
        width={20}
        height={20}
        border={`2px solid ${color}`}
        borderRadius="50%"
        style={{ cursor: "pointer" }}
      />
    </>
  );
};
