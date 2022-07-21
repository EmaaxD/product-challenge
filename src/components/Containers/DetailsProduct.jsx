import { useContext, useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import { productContext } from "../../context/actions/ProductProvider";

import {
  ButtonAddShoppCart,
  ButtonBuy,
  ButtonMenuProduct,
} from "../UI/Buttons";
import { MainSelect } from "../UI/Inputs";

import { colors, sizes } from "../../utils/options";
import { ModalBuy } from "../UI/Modal";

export const DetailsProduct = () => {
  const [productbuy, setProductBuy] = useState(null);
  const [buy, setBuy] = useState({
    color: "",
    size: "",
  });
  const [disablebtn, setDisableBtn] = useState(true);
  const [openmodal, setOpenModal] = useState(false);
  const [shopping, setShopping] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    selectedProduct,
    shoppingProducts,
    handleRemoveProduct,
    handleAddShoppingCart,
  } = useContext(productContext);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleChangeInput = ({ target }) => {
    setBuy((c) => ({ ...c, [target.name]: target.value }));
  };

  const handleClickBuy = () => {
    const productBuy = {
      ...buy,
      id: selectedProduct.id,
      title: selectedProduct.title,
      image: selectedProduct.image,
      price: selectedProduct.price,
      description: selectedProduct.description,
    };

    setProductBuy(productBuy);
    handleOpenModal();
  };

  const handleToggleShopping = () => {
    setShopping((c) => !c);
    handleAddShoppingCart(selectedProduct?.id);
  };

  useEffect(() => {
    (function () {
      const search = shoppingProducts.find(
        (item) => item.id === selectedProduct?.id
      );

      if (search) {
        setShopping(true);
      }
    })();
  }, []);

  useEffect(() => {
    (function () {
      if (selectedProduct?.color && selectedProduct?.size) {
        setBuy((c) => ({
          ...c,
          color: selectedProduct?.color,
          size: selectedProduct?.size,
        }));
        setDisableBtn(false);
      }
    })();
  }, []);

  useEffect(() => {
    (function () {
      if (buy.color !== "" && buy.size !== "") {
        setDisableBtn(false);
      }
    })();
  }, [buy]);

  return (
    <>
      <Stack
        display="flex"
        justifyContent="space-around"
        flex={1}
        spacing={2}
        id="detailPro"
      >
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={500} textAlign="center">
            {selectedProduct?.title}
          </Typography>

          <Box position="absolute" right={20}>
            <ButtonMenuProduct
              idProduct={selectedProduct?.id}
              open={open}
              anchorEl={anchorEl}
              onHandleClick={handleOpenMenu}
              onHandleClose={handleCloseMenu}
              onHandleRemoveProduct={handleRemoveProduct}
            />
          </Box>
        </Box>

        <Typography variant="body1" color="GrayText">
          {selectedProduct?.description}
        </Typography>

        <Stack display="flex" spacing={1}>
          <Stack
            display="flex"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <MainSelect
              labelId="label-color-id"
              name="color"
              text="Color"
              value={buy.color}
              options={colors}
              onHandleChange={handleChangeInput}
            />
            <MainSelect
              labelId="label-size-id"
              name="size"
              text="Talle"
              value={buy.size}
              options={sizes}
              onHandleChange={handleChangeInput}
            />
          </Stack>

          {buy.color === "" && buy.size === "" && (
            <Typography variant="caption" color="GrayText">
              Seleccione un color y talle para continuar
            </Typography>
          )}
        </Stack>

        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Box display="flex" flex={1}>
            <ButtonBuy disablebtn={disablebtn} onHandleClick={handleClickBuy} />
          </Box>

          <ButtonAddShoppCart
            shopping={shopping}
            onHandleClick={handleToggleShopping}
          />
        </Stack>
      </Stack>

      <ModalBuy
        open={openmodal}
        productbuy={productbuy}
        onHandleClose={handleCloseModal}
      />
    </>
  );
};
