import { Button } from "@mui/material";

type DeleteButtonProps = {
  onClick?: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={(theme) => ({
        color: 'white',
        backgroundColor: '#ff6265e9', 
        width: 100,
        [theme.breakpoints.down('sm')]: { // スマホ
          width: '30%',
        },
        [theme.breakpoints.between('sm', 'md')]: { // タブレット
          width: 133,
        },
        [theme.breakpoints.up('md')]: { // PC
          width: 150,
        },
      })}
    >
      削除
    </Button>
  );
};

export default DeleteButton;