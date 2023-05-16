import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

export const EmptyChat = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Select a message
        </Typography>
        <Typography variant="span">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{ fontSize: '18px', borderRadius: '30px' }}
      >
        New message
      </Button>
    </Box>
  );
};
