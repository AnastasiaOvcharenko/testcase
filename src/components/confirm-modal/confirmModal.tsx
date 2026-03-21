import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  movieName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isFavorite: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  movieName,
  onClose,
  onConfirm,
  isFavorite,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{
        transition: React.Fragment,
      }}
    >
      <DialogTitle>
        <Typography variant="h5">Подтвердите действие</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {isFavorite
            ? `Удалить фильм "${movieName}" из избранного?`
            : `Добавить фильм "${movieName}" в избранное?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
