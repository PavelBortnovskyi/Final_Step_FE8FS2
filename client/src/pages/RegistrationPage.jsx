import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/reducers/modalSlice';
import { Modal } from 'src/components/Modal/Modal';
import { FormRegistration } from 'src/components/_forms/FormRegistration';

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  dispatch(openModal());

  return (
    <Modal title="Sign up">
      <FormRegistration />
    </Modal>
  );
};
