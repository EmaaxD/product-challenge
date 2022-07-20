import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const MainTitle = ({ text }) => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography
        variant="h4"
        color="white"
        textAlign="center"
        textTransform="capitalize"
      >
        {text}
      </Typography>
    </Link>
  );
};
