import { Box, styled } from '@mui/material';
// import { format } from 'timeago.js';
import TimeAgo from 'timeago-react';
import { useSelector } from 'react-redux';

import { getUserData } from 'src/redux/selectors/selectors';

const User = styled(Box)`
  background-color: #00b69d30;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  border-radius: 7px;
  max-width: 60%;
  width: fit-content;
  text-align: right;
  word-break: break-word;
`;

const Guest = styled(Box)`
  background-color: #005cb62f;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  border-radius: 7px;
  max-width: 60%;
  width: fit-content;
  text-align: left;
  word-break: break-word;
`;

const BoxTime = styled(Box)`
  font-size: 10px;
  color: #707070;
  margin-top: 6px;
  border-top: 1px solid #f6f6f663;
  font-style: italic;
`;

export const ChatBodyMessage = ({ message }) => {
  const { user } = useSelector(getUserData);

  // console.log(message);

  return (
    <>
      {user.id === message.userId ? (
        <User>
          <Box>{message.text}</Box>
          <BoxTime>
            <TimeAgo datetime={message.createdAt} />
          </BoxTime>
        </User>
      ) : (
        <Guest>
          <Box>{message.text}</Box>
          <BoxTime>
            <TimeAgo datetime={message.createdAt} />
          </BoxTime>
        </Guest>
      )}
    </>
  );
};
