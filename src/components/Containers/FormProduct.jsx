import { Box, Stack, Typography, Button, styled } from "@mui/material";

import {
  CheckAviableOff,
  MainInput,
  MainSelect,
  MultipleSelect,
  TextAreaProduct,
} from "../UI/Inputs";
import { Message } from "../UI/Message";

import { categories, colors, sizes } from "../../utils/options";

const ContainerInputs = styled(Stack)(({ theme }) => ({
  padding: "0 80px",

  [theme.breakpoints.down("md")]: {
    padding: "0 5px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 0px",
  },
}));
const ContainerGroupInputs = styled(Stack)(({ theme }) => ({
  flexDirection: "row",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 20,

    "& div": {
      margin: "0 !important",
    },
    "& textarea": {
      margin: "0 !important",
    },
  },
}));

export const FormProduct = ({
  edit,
  form,
  error,
  success,
  onHandleChangeInputs,
  onHandleChangeMultiSelect,
  onHandleChangeCheck,
  onHandleSubmit,
}) => {
  return (
    <>
      <Stack display="flex" spacing={5}>
        <Typography variant="h6" fontWeight={500} textAlign="center">
          {edit ? "Editar producto" : "Crea un producto"}
        </Typography>

        <form onSubmit={onHandleSubmit}>
          <ContainerInputs display="flex" spacing={2.5}>
            <ContainerGroupInputs display="flex" direction="row" spacing={1.5}>
              <MainInput
                name="title"
                value={form.title}
                text="Producto"
                placeholder="Nombre del producto"
                onHandleChange={onHandleChangeInputs}
              />
              <MainInput
                name="price"
                type="number"
                value={form.price}
                text="Precio"
                placeholder="Precio del producto"
                onHandleChange={onHandleChangeInputs}
              />
              <MainInput
                name="image"
                value={form.image}
                text="Imagen"
                placeholder="Url imagen del producto"
                onHandleChange={onHandleChangeInputs}
              />
            </ContainerGroupInputs>

            <ContainerGroupInputs display="flex" direction="row" spacing={1.5}>
              <MainSelect
                labelId="label-category-id"
                name="category"
                text="Categoria"
                value={form.category}
                options={categories}
                onHandleChange={onHandleChangeInputs}
              />
              <MultipleSelect
                name="colors"
                text="Colores"
                labelId="label-colors-id"
                value={form.colors}
                options={colors}
                onHandleChange={onHandleChangeMultiSelect}
              />
              <MultipleSelect
                name="sizes"
                text="Medidas"
                labelId="label-sizes-id"
                value={form.sizes}
                options={sizes}
                onHandleChange={onHandleChangeMultiSelect}
              />
            </ContainerGroupInputs>

            <ContainerGroupInputs display="flex" direction="row" spacing={1.5}>
              <MainInput
                name="rate"
                value={form.rate}
                text="Puntaje"
                placeholder="Puntaje del producto"
                onHandleChange={onHandleChangeInputs}
              />

              <TextAreaProduct
                name="description"
                value={form.description}
                onHandleChange={onHandleChangeInputs}
              />
            </ContainerGroupInputs>

            <Box>
              <CheckAviableOff
                name="off"
                checked={form.off}
                text="¿Desea descuento?"
                onHandleChange={onHandleChangeCheck}
              />
            </Box>

            {error && <Message type="error" message={error} />}

            {success && <Message type="success" message={success} />}

            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="small"
                fullWidth
                disabled={success ? true : false}
              >
                {edit ? "Guardar" : "Enviar"}
              </Button>
            </Box>
          </ContainerInputs>
        </form>
      </Stack>
    </>
  );
};
