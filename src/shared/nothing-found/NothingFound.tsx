import { Box, Typography } from "@mui/material";

const NothingFound = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      height={"100%"}
    >
      <Typography variant="h6">Ничего не найдено</Typography>
    </Box>
  );
};

export default NothingFound;
