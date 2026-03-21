import { Box, Typography } from "@mui/material";

const NothingFound: React.FC = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      width={"100%"}
    >
      <Typography variant="h6">Ничего не найдено</Typography>
    </Box>
  );
};

export default NothingFound;
