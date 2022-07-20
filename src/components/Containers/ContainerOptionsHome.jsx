import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteIcon from "@mui/icons-material/Favorite";

import { ButtonOptionHome } from "../UI/Buttons";

export const ContainerOptionsHome = () => {
  const navegation = useNavigate();

  return (
    <>
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" color="white" fontWeight={400}>
          Acciones
        </Typography>

        <Stack display="flex" direction="row" spacing={2}>
          <ButtonOptionHome
            title="Agregar producto"
            icon={AddIcon}
            onHandleClick={() => navegation("/product-create")}
          />
          {/* <ButtonOptionHome
            title="Ver favoritos"
            icon={FavoriteIcon}
            onHandleClick={() => console.log("log click")}
          />
          <ButtonOptionHome
            title="Ver carrito"
            icon={ShoppingCartIcon}
            onHandleClick={() => console.log("log click")}
          /> */}
        </Stack>
      </Stack>
    </>
  );
};
