import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { productContext } from "../../context/actions/ProductProvider";

import { ButtonOptionHome } from "../UI/Buttons";
import { MainModal } from "../UI/Modal";

export const ContainerOptionsHome = () => {
  const [mdlfav, setMdlFav] = useState(false);
  const [mdlshopp, setMdlShopp] = useState(false);

  const navegation = useNavigate();

  const { favoriteProducts, shoppingProducts, handleSelectedProduct } =
    useContext(productContext);

  const handleSelect = (idProduct) => {
    handleSelectedProduct(idProduct);
    navegation(`/product-details/${idProduct}`);
  };

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
          <ButtonOptionHome
            title="Ver favoritos"
            badge={favoriteProducts}
            icon={FavoriteIcon}
            onHandleClick={() => setMdlFav((c) => !c)}
          />
          <ButtonOptionHome
            title="Ver carrito"
            badge={shoppingProducts}
            icon={ShoppingCartIcon}
            onHandleClick={() => setMdlShopp((c) => !c)}
          />
        </Stack>
      </Stack>

      <MainModal
        open={mdlfav}
        favorite
        options={favoriteProducts}
        onHandleSelect={handleSelect}
        onHandleClose={() => setMdlFav((c) => !c)}
      />
      <MainModal
        open={mdlshopp}
        options={shoppingProducts}
        onHandleSelect={handleSelect}
        onHandleClose={() => setMdlShopp((c) => !c)}
      />
    </>
  );
};
