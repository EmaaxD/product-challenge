import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const EmptyProducts = () => {
  const navegation = useNavigate();

  return (
    <>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mx="auto"
        mt={10}
      >
        <Typography variant="h6" color="white">
          Empieza agregando productos
        </Typography>

        <Box width={200}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon sx={{ color: "white" }} />}
            size="small"
            sx={{ bgcolor: "purple", ":hover": { bgcolor: "purple" } }}
            onClick={() => navegation("/product-create")}
          >
            Crear producto
          </Button>
        </Box>
      </Stack>
    </>
  );
};
