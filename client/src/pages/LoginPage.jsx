import { Modal } from 'src/components/Modal/Modal';
import { FormLogin } from 'src/components/_forms/FormLogin';

export const LoginPage = () => {
  return (
    <Modal title="Log in">
      <FormLogin />
    </Modal>
  );
};
