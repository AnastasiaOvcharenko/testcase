import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import CompareIcon from "@mui/icons-material/Compare";
import { useContext, useEffect, useState } from "react";
import { CompareContext } from "../../pages/main-page/state/CompareContext";
import ComparisonTable from "./comparison-table/ComparisonTable";

const SidebarCompare = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const SidebarWidth = isOpen ? "40vw" : "3vw";
  const { movies, clearMovies } = useContext(CompareContext);

  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (movies.length > 0) setIsOpen(true);
  }, [movies]);

  return (
    <Paper
      sx={{
        height: "100vh",
        width: SidebarWidth,
        flexShrink: "0",
        minWidth: "40px",
        transition: "ease 0.3s",
        position: "sticky",
        top: "0",
        overflow: "hidden",
      }}
    >
      <Box width={"40vw"} height="100%">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <IconButton onClick={handleToggleSidebar} aria-label="open sidebar">
              <CompareIcon />
            </IconButton>
            <Typography variant="body1">Режим сравнения</Typography>
          </Box>
          <Button onClick={clearMovies}>Очистить</Button>
        </Box>

        <Box visibility={isOpen ? "visible" : "hidden"} height={"100%"}>
          <ComparisonTable />
        </Box>
      </Box>
    </Paper>
  );
};

export default SidebarCompare;
