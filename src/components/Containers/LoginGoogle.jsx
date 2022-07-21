import { useContext } from "react";
import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { authContext } from "../../context/actions/AuthProvider";

import { ButtonLogin } from "../UI/Buttons";

import ImageGoogle from "../../assets/img/googleImg.png";

const useStyles = makeStyles(() => ({
  containerImg: {
    width: 200,
    // height: 200,

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  bntLogin: {},
}));

export const LoginGoogle = () => {
  const classes = useStyles();

  const { handleSignInGoogle } = useContext(authContext);

  return (
    <>
      <Stack display="flex" alignItems="center" spacing={8} mt={20}>
        <Box className={classes.containerImg}>
          <img src={ImageGoogle} alt="logo google" />
        </Box>

        <Box width={100}>
          <ButtonLogin onHandleClick={handleSignInGoogle} />
        </Box>
      </Stack>
    </>
  );
};
