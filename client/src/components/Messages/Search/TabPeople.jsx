import { useSelector } from 'react-redux';
import { getUserData } from 'src/redux/selectors/selectors';
import { Loading } from './../../../UI/Loading';

export const TabPeople = () => {
  const { findUser, isLoading } = useSelector(getUserData);

  const result = findUser?.content.length ? 'yes' : 'no';

  // console.log(findUser);
  // console.log(findUser?.content);

  return (
    <div>
      <Loading />
    </div>
  );
};
