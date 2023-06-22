import { UserName } from './UserName';
import { UserTweetsNumber } from './UserTweensNumber';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '../../UI/ArrowBack';

export function UserHeder({ fullName, tweetsCounter }) {
  const navigate = useNavigate();
  const handleBack = async () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        backdropFilter: 'blur(6px)',
        width: '100%',

        position: 'sticky',
        top: '0',
        zIndex: 13,

        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '8px',
      }}
    >
      <ArrowBack />

      <Box>
        <UserName fullName={fullName} />
        <UserTweetsNumber tweetsCounter={tweetsCounter} />
      </Box>
    </Box>
  );
}
