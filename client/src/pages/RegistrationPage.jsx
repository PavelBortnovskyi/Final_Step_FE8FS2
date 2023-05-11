import { Modal } from 'src/components/Modal/Modal';
import { FormRegistration } from 'src/components/_forms/FormRegistration';

export const RegistrationPage = () => {
  return (
    <Modal title="Sign up">
      <FormRegistration />
    </Modal>
  );
};
