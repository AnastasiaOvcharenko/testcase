import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router";

import ToggleTheme from "../../shared/toggle-theme/ToggleTheme";

import SearchBar from "./searchHeader/SearchHeader";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="primary" position="fixed">
          <Toolbar
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Кинопоиск
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SearchBar />
              <Button color="inherit" onClick={() => navigate(-1)}>
                ← Назад
              </Button>

              <Link to="/">
                <Button color="inherit" sx={{ color: "white" }}>
                  Главная
                </Button>
              </Link>
              <Link to="/likes">
                <Button color="inherit" sx={{ color: "white" }}>
                  Избранное
                </Button>
              </Link>
              <ToggleTheme />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box width={"100%"} height={"64px"}></Box>
    </>
  );
};

export default Header;
