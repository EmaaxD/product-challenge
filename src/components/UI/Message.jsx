import { Box } from "@mui/material";
import Fade from "react-reveal/Fade";

export const Message = ({ type, message }) => {
  return (
    <Fade>
      <Box
        bgcolor={type === "error" ? "#fb4f4f" : "green"}
        width="100%"
        color="white"
        p={2}
        textAlign="center"
        borderRadius={3}
      >
        {message}
      </Box>
    </Fade>
  );
};
