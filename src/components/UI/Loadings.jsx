import { Stack, Skeleton } from "@mui/material";

export const LoadingFilter = () => {
  return (
    <>
      <Skeleton
        sx={{ borderRadius: 5 }}
        variant="rectangular"
        width="100%"
        animation="wave"
        height={110}
      />
    </>
  );
};

export const LoadingProducts = () => {
  return (
    <>
      <Stack display="flex" spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={218} />
        <Skeleton />
      </Stack>
    </>
  );
};

export const LoadingAcctions = () => {
  return (
    <>
      <Stack display="flex" spacing={2}>
        <Skeleton width="100%" height={50} />
      </Stack>
    </>
  );
};

export const LoadingProduct = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height={318} />
    </>
  );
};
