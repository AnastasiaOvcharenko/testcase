import { CircularProgress, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
