import { useState } from "react";
import {
  Fade,
  Modal,
  Typography,
  Box,
  Backdrop,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { ButtonBuy } from "./Buttons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const useStyles = makeStyles(() => ({
  containerImg: {
    width: 600,
    height: 200,

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6,
    },
  },
}));

export const ModalBuy = ({ open, productbuy, onHandleClose }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const navegation = useNavigate();

  const handleClickBuy = () => {
    setLoading((c) => !c);

    setTimeout(() => {
      setLoading((c) => !c);
      setSuccess(true);
    }, 2000);

    setTimeout(() => {
      navegation("/");
    }, 3000);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {loading ? (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={5}
              >
                <CircularProgress style={{ color: "purple " }} size={35} />
              </Box>
            ) : (
              <>
                {success ? (
                  <>
                    <Typography variant="h4" color="green" textAlign="center">
                      Muchas Gracias por tu compra
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                      textAlign="center"
                    >
                      Realizar compra
                    </Typography>

                    <Stack display="flex" direction="row" spacing={5} mt={5}>
                      <Box className={classes.containerImg}>
                        <img
                          src={productbuy?.image}
                          alt="producto selected buy"
                        />
                      </Box>

                      <Stack display="flex" spacing={2}>
                        <Typography variant="body1" fontWeight={500}>
                          {productbuy?.title}
                        </Typography>
                        <Typography variant="body1" color="GrayText">
                          {productbuy?.description}
                        </Typography>

                        <Stack
                          display="flex"
                          direction="row"
                          spacing={3}
                          alignItems="center"
                        >
                          <Stack display="flex" direction="row" spacing={1}>
                            <Typography variant="body1" fontWeight={500}>
                              Color:{" "}
                            </Typography>
                            <Typography variant="body1">
                              {productbuy?.color}
                            </Typography>
                          </Stack>
                          <Stack display="flex" direction="row" spacing={1}>
                            <Typography variant="body1" fontWeight={500}>
                              Medida:{" "}
                            </Typography>
                            <Typography variant="body1">
                              {productbuy?.size}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Box display="flex" justifyContent="center" mt={5} px={6}>
                      <ButtonBuy onHandleClick={handleClickBuy} />
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
