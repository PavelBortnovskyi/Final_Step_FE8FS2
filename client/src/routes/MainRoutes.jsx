import { useRoutes } from 'react-router-dom';
import { mainRoutes } from './routes';

export const MainRoutes = ({ location }) => {
  return useRoutes(mainRoutes(), location);
};
