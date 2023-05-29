import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Modal = (props) => {
  const theme = useTheme();

  // set state modal for transition close the modal when browser change back url
  const [isOpen, setIsOpen] = useState(true);

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

  // get props for create modal view
  const { title = 'title', children = 'body', actionsBtn = false } = props;
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle sx={{ color: `${theme.palette.black.main}` }}>
          {title}
          {/* <Button onClick={handleClose}>X</Button> */}
        </DialogTitle>
        <DialogContent dividers sx={{ color: `${theme.palette.black.main}` }}>
          {children}
        </DialogContent>
        {actionsBtn && <DialogActions dividers>{actionsBtn}</DialogActions>}
      </Dialog>
    </>
  );
};
