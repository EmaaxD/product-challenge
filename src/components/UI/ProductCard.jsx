import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography, Button, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Fade from "react-reveal/Fade";

import { productContext } from "../../context/actions/ProductProvider";

import { ContainerContentCard } from "../Containers/ContainerContentCard";

import { getFormatMoney } from "../../utils/getFormatMoney";
import { ImageProduct } from "./ImageProduct";
import { ButtonColorGroup, ButtonSizesGroup } from "./Buttons";

const ContainerProduct = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: 300,
    margin: "auto",
  },
}));

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
      height: 250,
      objectFit: "cover",
      transition: "all .3s ease",
    },

    "&:hover": {
      "& img": {
        transform: "scale(1.2)",
      },
    },
  },
  productCard__titleOff: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

export const ProductCard = (props) => {
  const classes = useStyles();

  const { id, title, price, off, codeOff, image, colors, sizes, rate } = props;

  const [colorsgroup, setColorsGroup] = useState("");
  const [sizesgroup, setSizesGroup] = useState("");

  const { handleSelectedProduct } = useContext(productContext);

  const navegation = useNavigate();

  const handleChangeColorsGrp = (event, newAlignment) => {
    setColorsGroup(newAlignment);
  };

  const handleChangeSizesGrp = (event, newAlignment) => {
    setSizesGroup(newAlignment);
  };

  const handleProductSelect = () => {
    handleSelectedProduct(id, { color: colorsgroup, size: sizesgroup });

    navegation(`/product-details/${id}`);
  };

  return (
    <Fade>
      <ContainerProduct display="flex" spacing={2}>
        <Stack
          bgcolor="white"
          borderRadius={1.5}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <ImageProduct idProduct={id} image={image} off={off} />

          <Stack display="flex" spacing={1.5} py={1}>
            <ContainerContentCard>
              <Typography
                variant="body1"
                color="black"
                fontWeight={500}
                lineHeight={1.2}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                color="red"
                fontWeight={500}
                lineHeight={1.2}
              >
                {getFormatMoney(
                  typeof price === "string" ? Number(price) : price
                )}
              </Typography>
            </ContainerContentCard>

            <ContainerContentCard>
              <ButtonColorGroup
                colors={colors}
                value={colorsgroup}
                onHandleChange={handleChangeColorsGrp}
              />

              <ButtonSizesGroup
                sizes={sizes}
                value={sizesgroup}
                onHandleChange={handleChangeSizesGrp}
              />
            </ContainerContentCard>

            <ContainerContentCard>
              <Stack
                display="flex"
                direction="row"
                alignItems="center"
                spacing={0.5}
              >
                <StarBorderIcon style={{ color: "GrayText", fontSize: 14 }} />
                <Typography fontSize={12} color="GrayText">
                  {rate}
                </Typography>
              </Stack>

              <Button
                variant="text"
                size="small"
                onClick={handleProductSelect}
                style={{ color: "purple" }}
              >
                Ver
              </Button>
            </ContainerContentCard>
          </Stack>
        </Stack>

        {off && (
          <Box
            display="flex"
            bgcolor="white"
            borderRadius={1.5}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          >
            <Stack
              display="flex"
              flex={1}
              alignItems="center"
              spacing={0}
              py={1}
            >
              <Typography variant="caption" color="GrayText" fontWeight={500}>
                Code Desc
              </Typography>
              <Typography
                variant="subtitle1"
                color="red"
                fontWeight={600}
                textTransform="uppercase"
              >
                {codeOff}
              </Typography>
            </Stack>

            <Stack
              bgcolor="purple"
              display="flex"
              spacing={0}
              py={1}
              px={5}
              className={classes.productCard__titleOff}
            >
              <Typography variant="body1" color="white" fontWeight={500}>
                {off}
              </Typography>
              <Typography variant="body1" color="white">
                off
              </Typography>
            </Stack>
          </Box>
        )}
      </ContainerProduct>
    </Fade>
  );
};
