import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { closeModal } from 'src/redux/reducers/modalSlice';
import { getModalState } from 'src/redux/selectors/selectors';

export const Modal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get modal data
  const { isOpen } = useSelector(getModalState);

  // function for close modal
  const handleModalClose = () => {
    navigate(-1);
    dispatch(closeModal());
  };

  const { title = 'title', children = 'body', actionsBtn = false } = props;
  return (
    <>
      <Dialog open={isOpen} onClose={handleModalClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {actionsBtn && <DialogActions dividers>{actionsBtn}</DialogActions>}
      </Dialog>
    </>
  );
};
