import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

export const SearchNoResult = ({ searchText }) => {
  return (
    <Box>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          No results for "{searchText}"
        </Typography>
        <Typography variant="span">
          The term you entered did not bring up any results
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{ fontSize: '18px', borderRadius: '30px' }}
      >
        Start new message
      </Button>
    </Box>
  );
};
