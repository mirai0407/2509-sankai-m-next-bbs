import { Button } from "@mui/material";

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={(theme) => ({
        color: 'white',
        backgroundColor: '#56e3b9ff', 
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
      編集
    </Button>
  );
};

export default EditButton;