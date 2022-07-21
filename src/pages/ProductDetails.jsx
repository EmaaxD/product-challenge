import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack, styled } from "@mui/material";
import Fade from "react-reveal/Fade";

import { productContext } from "../context/actions/ProductProvider";

import { MainTitle } from "../components/UI/Titles";
import { MainContainer } from "../components/Containers/MainContainer";
import { ContainerContent } from "../components/Containers/ContainerContent";

import { ImageProduct } from "../components/UI/ImageProduct";
import { DetailsProduct } from "../components/Containers/DetailsProduct";
import { ButtonResponsiveAddPro } from "../components/UI/Buttons";
import { LoadingProduct } from "../components/UI/Loadings";

const Product = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",

    "& #detailPro": {
      margin: "25px 0 0 0 !important",
    },
  },
}));

export const ProductDetails = () => {
  const { loading, products, selectedProduct, handleSelectedProduct } =
    useContext(productContext);

  const { id } = useParams();

  useEffect(() => {
    (function () {
      if (!selectedProduct && products.length > 0) {
        handleSelectedProduct(id);
      }
    })();
  }, [products]);

  return (
    <Box height="93vh">
      <Box py={2}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              <Fade>
                <MainTitle text="products challenge :D" />
                <br />

                <ButtonResponsiveAddPro />
              </Fade>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>

      <Box my={5}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <Fade>
                  <LoadingProduct />
                </Fade>
              ) : (
                <Fade>
                  <ContainerContent>
                    <Product
                      display="flex"
                      direction="row"
                      justifyContent="space-between"
                      spacing={5}
                    >
                      <ImageProduct
                        idProduct={id}
                        image={selectedProduct?.image}
                        off={selectedProduct?.off}
                        height={350}
                      />

                      <DetailsProduct />
                    </Product>
                  </ContainerContent>
                </Fade>
              )}
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
    </Box>
  );
};
