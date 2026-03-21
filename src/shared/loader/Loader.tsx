import { CircularProgress, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" width={"100%"}>
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
