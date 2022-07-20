import { Box, Typography } from "@mui/material";

export const CircleSize = ({ size }) => {
  return (
    <>
      <Box
        width={20}
        height={20}
        border={`2px solid gray`}
        borderRadius="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1.3}
        style={{ cursor: "pointer" }}
      >
        <Typography fontSize={10} fontWeight={500} textTransform="uppercase">
          {size}
        </Typography>
      </Box>
    </>
  );
};
