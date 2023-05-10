import { useRoutes } from 'react-router-dom';
import { modalRoutes } from './routes';

export const ModalRoutes = () => {
  return useRoutes(modalRoutes());
};
