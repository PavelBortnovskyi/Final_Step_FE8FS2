import { Link } from 'react-router-dom';
import { FormLogin } from 'src/components/_forms/FormLogin';

export const LoginPage = () => {
  return (
    <div className="">
      <h1>Вхід</h1>
      <FormLogin />
      <Link to="/registration">Реєстрація</Link>
    </div>
  );
};
