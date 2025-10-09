import { Button } from "@mui/material";

type YesButtonProps = {
  onClick?: () => void;
};

const YesButton = ({ onClick }: YesButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={(theme) => ({
        color: 'white',
        backgroundColor: '#959595ff', 
        width: 100,
        [theme.breakpoints.down('sm')]: { // スマホ
          width: '40%',
        },
        [theme.breakpoints.between('sm', 'md')]: { // タブレット
          width: 133,
        },
        [theme.breakpoints.up('md')]: { // PC
          width: 150,
        },
      })}
    >
      はい
    </Button>
  );
};

export default YesButton;