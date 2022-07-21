import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Fade from "react-reveal/Fade";

import { MainTitle } from "../components/UI/Titles";
import { MainContainer } from "../components/Containers/MainContainer";
import { ContainerContent } from "../components/Containers/ContainerContent";
import { FormProduct } from "../components/Containers/FormProduct";
import { useForm } from "../hooks/useForm";

const useStyles = makeStyles(() => ({
  productCreate: {
    height: ({ pathname }) => pathname === "/product-create" && "93vh",
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

export const ProductCreate = () => {
  const { pathname } = useLocation();

  const classes = useStyles({ pathname });

  const {
    error,
    form,
    success,
    handleChangeInputs,
    handleChangeMultiSelect,
    handleChangeCheck,
    handleSubmitCreate,
  } = useForm(initialState);

  return (
    <Box className={classes.productCreate}>
      <Box py={2}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              <Fade>
                <MainTitle text="products challenge :D" />
              </Fade>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>

      <Box my={5}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              <Fade>
                <ContainerContent>
                  <FormProduct
                    form={form}
                    error={error}
                    success={success}
                    onHandleChangeInputs={handleChangeInputs}
                    onHandleChangeMultiSelect={handleChangeMultiSelect}
                    onHandleChangeCheck={handleChangeCheck}
                    onHandleSubmit={handleSubmitCreate}
                  />
                </ContainerContent>
              </Fade>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
    </Box>
  );
};
