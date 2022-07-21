import { Box, Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Fade from "react-reveal/Fade";

import { useForm } from "../hooks/useForm";

import { MainTitle } from "../components/UI/Titles";
import { MainContainer } from "../components/Containers/MainContainer";
import { ContainerContent } from "../components/Containers/ContainerContent";
import { FormProduct } from "../components/Containers/FormProduct";
import { ButtonResponsiveAddPro } from "../components/UI/Buttons";
import { LoadingProduct } from "../components/UI/Loadings";

const useStyles = makeStyles(() => ({
  productCreate: {
    height: ({ pathname }) => pathname !== "/" && "93vh",
  },
}));

const initialState = {
  title: "",
  price: 0,
  image:
    "https://ih1.redbubble.net/image.1186321872.8871/ssrco,slim_fit_t_shirt,mens,101010:01c5ca27c6,front,square_product,600x600.jpg",
  category: "",
  colors: [],
  sizes: [],
  rate: "4.5",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste provident amet atque, aperiam, quidem veniam nobis doloremque voluptatem officia quia dolorum quibusdam ut saepe aut eligendi ab architecto molestiae distinctio.",
  off: false,
};

export const ProductEdit = () => {
  const { pathname } = useLocation();

  const classes = useStyles({ pathname });

  const { id } = useParams();

  const {
    loading,
    error,
    form,
    success,
    handleChangeInputs,
    handleChangeMultiSelect,
    handleChangeCheck,
    handleSubmitEdit,
  } = useForm(initialState, id);

  return (
    <>
      <Box className={classes.productCreate}>
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
                      <FormProduct
                        edit
                        form={form}
                        error={error}
                        success={success}
                        onHandleChangeInputs={handleChangeInputs}
                        onHandleChangeMultiSelect={handleChangeMultiSelect}
                        onHandleChangeCheck={handleChangeCheck}
                        onHandleSubmit={handleSubmitEdit}
                      />
                    </ContainerContent>
                  </Fade>
                )}
              </Grid>
            </Grid>
          </MainContainer>
        </Box>
      </Box>
    </>
  );
};
