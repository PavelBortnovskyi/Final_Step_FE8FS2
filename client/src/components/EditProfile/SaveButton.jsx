import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

export function SaveButton({ handleClose }) {
  const { isValid } = useFormikContext();
  return (
    <Button
      disabled={!isValid}
      onClick={handleClose}
      variant="plain"
      type="submit"
      sx={{
        color: 'rgb(0 0 0)',
        background: 'white',
        border: '1px solid',
        textTransform: 'none',
        width: '106px',
        height: '34px',
        padding: '0 15px',
        borderRadius: '9999px',
        '&:hover': {
          backgroundColor: '#ffffffcf',
        },
      }}
    >
      Save
    </Button>
  );
}
