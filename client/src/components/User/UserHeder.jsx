import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { UserName } from './UserName';
import { UserTweetsNumber } from './UserTweensNumber';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      <Button
        onClick={handleBack}
        sx={{
          color: 'transparent !important',
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        <ArrowBackOutlinedIcon
          sx={{
            fill: 'rgb(139, 152, 165)',
            padding: '12px',
            borderRadius: '50%',
            boxSizing: 'content-box',

            '&:hover': {
              backgroundColor: '#b3b3b32b',
            },
          }}
        />
      </Button>

      <Box>
        <UserName fullName={fullName} />
        <UserTweetsNumber tweetsCounter={tweetsCounter} />
      </Box>
    </Box>
  );
}
