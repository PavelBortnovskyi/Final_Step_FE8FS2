import { useState } from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { FormLogin } from 'src/components/_forms/FormLogin';

export const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal title="Log in" setIsOpen={setIsOpen} isOpen={isOpen}>
      <FormLogin />
    </Modal>
  );
};
