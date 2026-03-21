import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";

const ToggleTheme = () => {
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    if (mode === "dark") setMode("light");
    else if (mode === "light") setMode("dark");
    else setMode("dark");
  };

  if (!mode) return null;

  return (
    <IconButton onClick={handleToggle} sx={{ width: "36px", height: "36px" }}>
      {mode === "dark" ? (
        <LightMode sx={{ color: "white" }} />
      ) : (
        <DarkMode sx={{ color: "white" }} />
      )}
    </IconButton>
  );
};

export default ToggleTheme;
