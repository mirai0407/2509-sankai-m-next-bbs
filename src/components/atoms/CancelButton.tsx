import { Button } from "@mui/material";

type CancelButtonProps = {
  onClick?: () => void;
};

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={(theme) => ({
        color: 'white',
        backgroundColor: '#777777ff', 
        Width: 100, 
        [theme.breakpoints.down('sm')]: {
          width: '40%', // スマホ
        },
        [theme.breakpoints.between('sm', 'md')]: { // タブレット
          width: 133,
        },
        [theme.breakpoints.up('md')]: { // PC
          width: 150,
        },
      })}
    >
      キャンセル
    </Button>
  );
};

export default CancelButton;