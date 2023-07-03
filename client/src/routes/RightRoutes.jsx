import { useRoutes } from 'react-router-dom';
import { rightRoutes } from './routes';

export const RightRoutes = ({ mobile }) => {
  return useRoutes(rightRoutes(mobile));
};
