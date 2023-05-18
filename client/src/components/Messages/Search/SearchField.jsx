import { Box } from '@mui/material';

import { SearchTabs } from './SearchTabs';
import { InputSearch } from 'src/UI/InputSearch/InputSearch';

const searchPeople = [
  {
    id: 1,
    username: 'Vasyl Semenov',
    verified: true,
    displayName: '@vasyl',
    postTime: '4 May',
    text: 'message temp text',
    avatarUrl: './img/avatar.jpg',
  },
  {
    id: 2,
    username: 'Semen Vasylevych',
    verified: true,
    displayName: '@semen',
    postTime: '5 May',
    text: 'message temp text',
    avatarUrl: './img/avatar.jpg',
  },
  {
    id: 3,
    username: 'Anton Nikolaev',
    verified: true,
    displayName: '@anton',
    postTime: '22 May',
    text: 'message temp text',
    avatarUrl: './img/avatar.jpg',
  },
];
const searchMessages = [
  {
    id: 1,
    username: 'Vasyl Semenov',
    verified: true,
    displayName: '@vasyl',
    postTime: '4 May',
    text: 'skfj s jfksjdfk sf sdf',
    avatarUrl: './img/avatar.jpg',
  },
  {
    id: 2,
    username: 'Semen Vasylevych',
    verified: true,
    displayName: '@semen',
    postTime: '5 May',
    text: 'sdfs sfsdfs sf sdfsdf',
    avatarUrl: './img/avatar.jpg',
  },
];

const searchText = 'search text';

export const SearchField = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <InputSearch />
      <Box sx={{ marginTop: '16px' }}>
        <SearchTabs
          searchText={searchText}
          // searchPeople=""
          // searchMessages=""
          searchPeople={searchPeople}
          searchMessages={searchMessages}
        />
      </Box>
    </Box>
  );
};
