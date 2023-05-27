import { useSelector } from 'react-redux';
import { getUserData } from 'src/redux/selectors/selectors';

export const TabPeople = () => {
  const { findUser } = useSelector(getUserData);

  const result = findUser?.content.length ? 'yes' : 'no';

  console.log(findUser);
  console.log(findUser?.content);

  return <div>tabPeople</div>;
};
