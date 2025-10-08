"use client";

import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import EditButton from "../components/atoms/EditButton";
import DeleteButton from "../components/atoms/DeleteButton";
import EditConfirmDialog from "../components/atoms/EditConfirmDialog";
import DeleteConfirmDialog from "../components/atoms/DeleteConfirmDialog";

const HomePage = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        gap={4}
      >
        <Typography variant="h5">管理ページ</Typography>
        <Typography variant="body1">
          編集や削除は下のボタンから行えます。
        </Typography>

        {/* 編集・削除ボタン */}
        <Box display="flex" gap={2}>
          <EditButton onClick={() => setOpenEditDialog(true)} />
          <DeleteButton onClick={() => setOpenDeleteDialog(true)} />
        </Box>

        {/* 編集確認ダイアログ */}
        <EditConfirmDialog
          open={openEditDialog}
          onConfirm={() => { setOpenEditDialog(false); alert("投稿orコメントが編集されました！"); }}
          onCancel={() => setOpenEditDialog(false)}
        />

        {/* 削除確認ダイアログ */}
        <DeleteConfirmDialog
          open={openDeleteDialog}
          onConfirm={() => { setOpenDeleteDialog(false); alert("投稿orコメントが削除されました！"); }}
          onCancel={() => setOpenDeleteDialog(false)}
        />
      </Box>
    </Container>
  );
};

export default HomePage;