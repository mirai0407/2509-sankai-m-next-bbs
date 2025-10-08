import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CancelButton from "./CancelButton";
import YesButton from "./YesButton"; 

type EditConfirmDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const EditConfirmDialog = ({ open, onConfirm, onCancel }: EditConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>編集の確認</DialogTitle>
      <DialogContent>
        本当にこの投稿を編集しますか？
      </DialogContent>
      <DialogActions>
        {/* CancelButton */}
        <CancelButton onClick={onCancel} />
        {/* YesButton */}
        <YesButton onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default EditConfirmDialog;