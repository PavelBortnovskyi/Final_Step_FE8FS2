import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Modal = (props) => {
  const theme = useTheme();
  // get props for create modal view
  const { title = 'title', children = 'body', actionsBtn = false, isOpen = false, setIsOpen } = props;
  console.log(isOpen);
  // set state modal for transition close the modal when browser change back url
  // const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = async () => {
    // for transition close modal
    setIsOpen(false);
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    // change back url
    !!location.state ? navigate(-1) : navigate('/');
  };

  
  
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: `${theme.palette.background.default}`,
            color: `${theme.palette.text.primary}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title}

          <CloseIcon
            onClick={handleClose}
            sx={{ color: `${theme.palette.text.primary}`, cursor: 'pointer' }}
          />
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            backgroundColor: `${theme.palette.background.default}`,
            color: `${theme.palette.black.main}`,
          }}
        >
          {children}
        </DialogContent>
        {actionsBtn && <DialogActions dividers>{actionsBtn}</DialogActions>}
      </Dialog>
    </>
  );
};
