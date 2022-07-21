import { Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MainInput, MainSelect } from "../UI/Inputs";

import { categories } from "../../utils/options";

const useStyles = makeStyles(() => ({
  filterProd: {
    minHeight: "110px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 45px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(25px)",
  },
}));

export const ProductFilter = ({ filter, onHandleChangeFilter }) => {
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.filterProd}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius={4}
        p={2}
      >
        <Stack display="flex" direction="row" spacing={2} mx="auto">
          <MainSelect
            labelId="label-category-id"
            name="category"
            text="Categoria"
            value={filter.category}
            options={categories}
            onHandleChange={onHandleChangeFilter}
            borderWithe
          />

          <MainSelect
            labelId="label-price-id"
            name="price"
            text="Precio"
            value={filter.price}
            options={[
              { value: "desc", text: "Menor" },
              { value: "asc", text: "Mayor" },
            ]}
            onHandleChange={onHandleChangeFilter}
            borderWithe
          />

          <MainInput
            name="search"
            value={filter.search}
            text="Buscar Producto"
            onHandleChange={onHandleChangeFilter}
            borderWithe
            placeholder="Buscar nombre producto"
          />
        </Stack>
      </Box>
    </>
  );
};
