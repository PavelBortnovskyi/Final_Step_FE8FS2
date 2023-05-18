import { Box } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import UserNames from 'src/UI/UserNames';

export const TabMessages = ({ searchMessages = null }) => {
  return (
    <>
      {searchMessages &&
        searchMessages.map((person) => {
          const {
            id,
            username,
            verified,
            displayName,
            postTime,
            text,
            avatarUrl,
          } = person;

          return (
            <Box
              key={id}
              display="flex"
              sx={{
                gap: '12px',
                alignItems: 'start',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid #333',
              }}
            >
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt={username}
                src={avatarUrl}
              />
              <UserNames
                color="red"
                username={username}
                verified={verified}
                displayName={displayName}
                postTime={postTime}
                text={text}
              />
            </Box>
          );
        })}
    </>
  );
};
