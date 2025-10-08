import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CancelButton from "./CancelButton";
import YesButton from "./YesButton"; 

type DeleteConfirmDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmDialog = ({ open, onConfirm, onCancel }: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>削除の確認</DialogTitle>
      <DialogContent>
        本当にこの投稿を削除しますか？この操作は元に戻せません。
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

export default DeleteConfirmDialog;