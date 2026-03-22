import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type React from "react";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#a66187" },
    secondary: { main: "#d979af" },
    background: { default: "#f4eaef" },
    mode: "light",
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: "#c47da3" },
        secondary: { main: "#e68fc1" },
        background: {
          default: "#121212",
        },
      },
    },
  },
});

const PaletteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default PaletteProvider;
