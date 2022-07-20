import { useEffect } from "react";
import {
  Button,
  IconButton,
  Tooltip,
  Fab,
  Box,
  Menu,
  MenuItem,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Hidden,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { confirmAlert } from "react-confirm-alert";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { CircleColor } from "./CircleColor";
import { CircleSize } from "./CircleSize";

import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = makeStyles(() => ({
  buttonFilter: {
    background: "#ce93d8 !important",
    width: 150,
  },
  buttonFavorite: {
    background: "#cbcaca !important",

    "& svg": {
      color: "GrayText",
    },
  },
  buttonBuy: {
    background: "#bb4fcd !important",
  },
  buttonAddPro: {
    backgroundColor: "white !important",
  },
  buttonColorGroup: {
    "& button": {
      border: "none",
      backgroundColor: "transparent !important",

      "& span": {
        display: "none",
      },
    },

    "& .Mui-selected": {
      backgroundColor: "transparent !important",

      "& > div": {
        background: ({ value }) => value,
      },
    },
  },
  buttonSizesGroup: {
    "& button": {
      border: "none",
      backgroundColor: "transparent !important",

      "& span": {
        display: "none",
      },
    },

    "& .Mui-selected": {
      backgroundColor: "transparent !important",

      "& > div": {
        background: "gray",
        color: "white",
      },
    },
  },
}));

export const ButtonFilter = ({ onHandleClick }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className={classes.buttonFilter}
        onClick={onHandleClick}
      >
        Buscar
      </Button>
    </>
  );
};

export const ButtonFavorite = ({ favorite, onHandleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Agregar a favoritos" placement="left-start" arrow>
        <>
          <IconButton
            className={classes.buttonFavorite}
            onClick={onHandleChange}
          >
            {favorite ? (
              <FavoriteIcon fontSize="small" style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </>
      </Tooltip>
    </>
  );
};

export const ButtonBuy = ({ disablebtn, onHandleClick }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        size="small"
        className={classes.buttonBuy}
        onClick={onHandleClick}
        disabled={disablebtn}
      >
        Comprar
      </Button>
    </>
  );
};

export const ButtonAddShoppCart = () => {
  return (
    <>
      <IconButton size="small">
        <AddShoppingCartIcon />
      </IconButton>
    </>
  );
};

export const ButtonAddProduct = () => {
  const classes = useStyles();

  const navegation = useNavigate();

  const { pathname } = useLocation();

  if (pathname === "/product-create" || pathname === "/") return null;

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <Box position="absolute" right={100} bottom={30}>
          <Tooltip title="Agregar producto" placement="left" arrow>
            <Fab
              className={classes.buttonAddPro}
              size="medium"
              aria-label="add"
              onClick={() => navegation("/product-create")}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Hidden>
    </>
  );
};

export const ButtonMenuProduct = ({
  idProduct,
  anchorEl,
  open,
  onHandleClick,
  onHandleClose,
  onHandleRemoveProduct,
}) => {
  const navegation = useNavigate();

  const handleEdit = () => {
    navegation(`/product-edit/${idProduct}`);
  };

  const handleDelete = () => {
    confirmAlert({
      title: "¡Espera un momento!",
      message: "¿Estas seguro de elimar este producto?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            onHandleRemoveProduct(idProduct);
            onHandleClose();
            navegation("/");
          },
        },
        {
          label: "No",
          onClick: () => onHandleClose(),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  useEffect(() => {
    return () => onHandleClose();
  }, []);

  return (
    <>
      <IconButton
        id="basic-button"
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={onHandleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onHandleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ zIndex: 0 }}
      >
        <MenuItem onClick={handleEdit}>
          <Box display="flex" alignItems="center" gap={2}>
            <EditIcon color="warning" fontSize="small" />
            <Typography variant="body1" color="GrayText" fontWeight={500}>
              Editar
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Box display="flex" alignItems="center" gap={2}>
            <DeleteIcon color="error" fontSize="small" />
            <Typography variant="body1" color="GrayText" fontWeight={500}>
              Eliminar
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export const ButtonColorGroup = ({ value, colors, onHandleChange }) => {
  const classes = useStyles({ value });

  return (
    <>
      <Box className={classes.buttonColorGroup}>
        <ToggleButtonGroup
          size="small"
          value={value}
          exclusive={true}
          onChange={onHandleChange}
        >
          {colors.map((item) => (
            <ToggleButton value={item.value} key={item.value}>
              <CircleColor color={item.value} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </>
  );
};

export const ButtonSizesGroup = ({ value, sizes, onHandleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.buttonSizesGroup}>
        <ToggleButtonGroup
          size="small"
          value={value}
          exclusive={true}
          onChange={onHandleChange}
        >
          {sizes.map((item) => (
            <ToggleButton value={item.value} key={item.value}>
              <CircleSize size={item.value} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </>
  );
};

export const ButtonOptionHome = ({ title, icon: Icon, onHandleClick }) => {
  return (
    <>
      <Tooltip title={title} arrow>
        <IconButton size="small" onClick={onHandleClick}>
          <Icon style={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const ButtonResponsiveAddPro = () => {
  const classes = useStyles();

  const navegation = useNavigate();

  const { pathname } = useLocation();

  if (pathname === "/product-create" || pathname === "/") return null;

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="small"
            className={classes.buttonBuy}
            onClick={() => navegation("/product-create")}
          >
            Crear Producto
          </Button>
        </Box>
      </Hidden>
    </>
  );
};
