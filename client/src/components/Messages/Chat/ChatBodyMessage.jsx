import { Box, styled } from '@mui/material';
import TimeAgo from 'timeago-react';
import { useSelector } from 'react-redux';

import { getUserData } from 'src/redux/selectors/selectors';
import { timestampToDate } from 'src/utils/messages/convertToDate';

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
  color: #9c9c9c;
  margin-top: 6px;
  border-top: 1px solid #f6f6f663;
  font-style: italic;
`;

export const ChatBodyMessage = ({ message }) => {
  const { user } = useSelector(getUserData);

  // converted message.sent value
  const messageSent = timestampToDate(message.sent);

  return (
    <>
      {user.id === message.userId ? (
        <User>
          <Box>{message.body}</Box>
          <BoxTime>
            <TimeAgo datetime={messageSent} />
          </BoxTime>
        </User>
      ) : (
        <Guest>
          <Box>{message.body}</Box>
          <BoxTime>
            <TimeAgo datetime={messageSent} />
          </BoxTime>
        </Guest>
      )}
    </>
  );
};
