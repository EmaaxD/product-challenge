import { useContext, useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@mui/styles";

import { productContext } from "../context/actions/ProductProvider";
import { authContext } from "../context/actions/AuthProvider";

import { MainTitle } from "../components/UI/Titles";
import { MainContainer } from "../components/Containers/MainContainer";
import { ProductFilter } from "../components/Containers/ProductFilter";
import { ProductCard } from "../components/UI/ProductCard";
import {
  LoadingAcctions,
  LoadingFilter,
  LoadingProducts,
} from "../components/UI/Loadings";
import { ContainerOptionsHome } from "../components/Containers/ContainerOptionsHome";
import { LoginGoogle } from "../components/Containers/LoginGoogle";

const useStyles = makeStyles(() => ({
  app: {
    height: ({ auth }) => (!auth ? "93vh" : "fit-content"),
  },
}));

export const Home = () => {
  const [filter, setFilter] = useState({
    category: "",
    price: "desc",
    search: "",
  });

  const { loading, products } = useContext(productContext);
  const { auth } = useContext(authContext);

  const classes = useStyles({ auth });

  const handleChangeFilter = ({ target }) => {
    setFilter((c) => ({
      ...c,
      [target.name]: target.value,
    }));
  };

  const memoProducts = useMemo(() => {
    if (filter.category !== "" || filter.price !== "" || filter.search !== "") {
      let result = [];

      result = products.filter(
        (item) => item.category.toLowerCase() === filter.category.toLowerCase()
      );

      if (result.length > 0) {
        if (filter.price === "desc") {
          result = result.sort((a, b) => a.price - b.price);
        } else {
          result = result.sort((a, b) => b.price - a.price);
        }
      } else {
        if (filter.price === "desc") {
          result = products.sort((a, b) => a.price - b.price);
        } else {
          result = products.sort((a, b) => b.price - a.price);
        }
      }

      if (filter.search !== "") {
        if (result) {
          result = result.filter((item) =>
            item.title.toLowerCase().includes(filter.search)
          );
        } else {
          result = products.filter((item) =>
            item.title.toLowerCase().includes(filter.search)
          );
        }
      }

      return result;
    } else {
      return products;
    }
  }, [filter, products]);

  return (
    <Box className={classes.app}>
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

      {!localStorage.getItem("auth") ? (
        <>
          <LoginGoogle />
        </>
      ) : (
        <>
          <Box my={5}>
            <MainContainer>
              <Grid container>
                <Grid item xs={12}>
                  <Fade>
                    <>
                      {loading ? (
                        <LoadingFilter />
                      ) : (
                        <Fade>
                          <ProductFilter
                            filter={filter}
                            onHandleChangeFilter={handleChangeFilter}
                          />
                        </Fade>
                      )}
                    </>
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
                    <>
                      {loading ? (
                        <LoadingAcctions />
                      ) : (
                        <Fade>
                          <ContainerOptionsHome />
                        </Fade>
                      )}
                    </>
                  </Fade>
                </Grid>
              </Grid>
            </MainContainer>
          </Box>

          <Box>
            <MainContainer>
              <Grid container spacing={2}>
                {loading ? (
                  <>
                    {[1, 2, 3].map((item) => (
                      <Grid key={item} item xs={12} sm={6} md={4}>
                        <Fade cascade>
                          <LoadingProducts />
                        </Fade>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <>
                    {memoProducts.map((item) => (
                      <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <ProductCard {...item} />
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </MainContainer>
          </Box>
        </>
      )}
    </Box>
  );
};
