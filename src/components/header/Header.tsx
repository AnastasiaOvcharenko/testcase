import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export default function Header() {
  let navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Кинопоиск
          </Typography>
          <Button color="inherit" onClick={() => navigate(-1)}>
            ← Назад
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Главная
          </Button>
          <Button color="inherit" onClick={() => navigate("/likes")}>
            Избранное
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
