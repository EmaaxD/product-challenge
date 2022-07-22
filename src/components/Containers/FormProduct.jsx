import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Fade from "react-reveal/Fade";

import {
  CheckAviableOff,
  MainInput,
  MainSelect,
  MultipleSelect,
  RatingInput,
  TextAreaProduct,
} from "../UI/Inputs";
import { Message } from "../UI/Message";

import { categories, colors, sizes } from "../../utils/options";
import { ModalImageProduct } from "../UI/Modal";
import { validateQuantity } from "../../utils/validations";

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
  fileRef,
  error,
  success,
  loading,
  onHandleChangeInputs,
  onHandleChangeFile,
  onHandleChangeMultiSelect,
  onHandleChangeRating,
  onHandleChangeCheck,
  onHandleSubmit,
}) => {
  const [open, setOpen] = useState(false);

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
              <Stack display="flex">
                <Box
                  width={200}
                  height={38.5}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  px={1}
                  border="1px solid rgba(0, 0, 0, 0.23)"
                  borderRadius={1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => fileRef.current.click()}
                >
                  <InsertPhotoIcon
                    fontSize="small"
                    sx={{ color: "GrayText" }}
                  />
                  <Typography variant="caption" color="GrayText">
                    {form.nameFile
                      ? validateQuantity(form.nameFile, 20)
                      : "Seleecione una imagen"}
                  </Typography>
                  <input
                    hidden
                    type="file"
                    name="image"
                    id="image"
                    ref={fileRef}
                    onChange={onHandleChangeFile}
                  />
                </Box>
                {form.image && (
                  <Fade>
                    <Typography
                      variant="caption"
                      color="GrayText"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setOpen((c) => !c)}
                    >
                      Ver image
                    </Typography>
                  </Fade>
                )}
              </Stack>
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
              <RatingInput
                name="rate"
                value={form.rate}
                onHandleChange={onHandleChangeRating}
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

            {!success && (
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={25} sx={{ color: "purple" }} />
                  ) : (
                    <>{edit ? "Guardar" : "Enviar"}</>
                  )}
                </Button>
              </Box>
            )}
          </ContainerInputs>
        </form>
      </Stack>

      <ModalImageProduct
        open={open}
        image={form.image}
        onHandleClose={() => setOpen((c) => !c)}
      />
    </>
  );
};
