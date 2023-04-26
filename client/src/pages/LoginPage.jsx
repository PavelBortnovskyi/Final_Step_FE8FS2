import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/reducers/modalSlice';
import { Modal } from 'src/components/Modal/Modal';
import { FormLogin } from 'src/components/_forms/FormLogin';

export const LoginPage = () => {
  const dispatch = useDispatch();

  dispatch(openModal());

  return (
    <Modal title="Log in">
      <FormLogin />
    </Modal>
  );
};
