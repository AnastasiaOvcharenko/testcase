import CompareIcon from "@mui/icons-material/Compare";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { CompareContext } from "../../pages/main-page/state/CompareContext";

import ComparisonTable from "./comparison-table/ComparisonTable";

const SidebarCompare: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarWidth = isOpen ? "40vw" : "50px";
  const sidebarHeight = isOpen ? "calc(100vh - 16px - 64px - 16px)" : "50px";
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
        height: sidebarHeight,
        width: sidebarWidth,
        flexShrink: "0",
        transition: "ease 0.3s",
        position: "sticky",
        top: "calc(64px + 16px)",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
        width={"40vw"}
        height="100%"
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Tooltip title="Режим сравнения" placement="right" arrow>
              <IconButton
                onClick={handleToggleSidebar}
                aria-label="open sidebar"
                sx={{ width: "50px", height: "50px" }}
              >
                <CompareIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Режим сравнения
            </Typography>
          </Box>
          <Button onClick={clearMovies}>Очистить</Button>
        </Box>

        <Box height={"100%"}>
          <ComparisonTable />
        </Box>
      </Box>
    </Paper>
  );
};

export default SidebarCompare;
