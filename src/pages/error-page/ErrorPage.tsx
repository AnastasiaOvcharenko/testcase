import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
import { Box, Button, Typography } from "@mui/material";
const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{
          width: "100%",
          height: "30vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Упс, указанный URL не существует!</Typography>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ErrorPage;
