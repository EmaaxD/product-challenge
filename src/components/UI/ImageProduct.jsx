import { useState, useContext, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Zoom from "react-img-zoom";

import { ButtonFavorite } from "./Buttons";
import { productContext } from "../../context/actions/ProductProvider";

const useStyles = makeStyles(() => ({
  productCard__img: {
    overflow: "hidden",
    cursor: "pointer",
    transition: "all .3s ease",

    "& img": {
      borderRadius: 1.5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      width: "100%",
      height: ({ height }) => (height ? height : 250),
      objectFit: "cover",
      transition: "all .3s ease",
    },

    "&:hover": {
      "& img": {
        transform: "scale(1.2)",
      },
    },
  },
}));

export const ImageProduct = ({ idProduct, image, off, height }) => {
  const classes = useStyles({ height });

  const [favorite, setFavorite] = useState(false);

  const { favoriteProducts, handleAddFavorite } = useContext(productContext);

  const handleClick = () => {
    setFavorite((c) => !c);
    handleAddFavorite(idProduct);
  };

  useEffect(() => {
    (function () {
      const search = favoriteProducts.find((item) => item.id === idProduct);

      if (search) {
        setFavorite(true);
      }
    })();
  }, []);

  return (
    <>
      <Box
        position="relative"
        className={classes.productCard__img}
        borderRadius={1.5}
      >
        <img src={image} alt="product image" />

        <Stack
          position="absolute"
          width="100%"
          top={10}
          display="flex"
          direction="row"
          justifyContent={!off ? "end" : "space-between"}
          alignItems="center"
          px={2}
          zIndex={9999999999}
        >
          {off && (
            <Box
              bgcolor="purple"
              px={0.9}
              py={0.5}
              color="white"
              fontSize={13}
              borderRadius={20}
            >
              {off}
            </Box>
          )}

          <ButtonFavorite favorite={favorite} onHandleChange={handleClick} />
        </Stack>
      </Box>
    </>
  );
};
