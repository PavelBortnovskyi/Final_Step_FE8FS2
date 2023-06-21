import { useState } from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { FormRegistration } from 'src/components/_forms/FormRegistration';

export const RegistrationPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal title="Sign up" setIsOpen={setIsOpen} isOpen={isOpen}>
      <FormRegistration />
    </Modal>
  );
};
