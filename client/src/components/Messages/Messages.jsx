import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { NavLink } from 'react-router-dom';
import { SearchField } from './Search/SearchField';
import { InputSearch } from 'src/UI/InputSearch/InputSearch';

export const Messages = () => {
  return (
    <Box>
      <Container>
        {/* Title & action btn */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0 26px',
          }}
        >
          <Typography variant="h6">Messages</Typography>
          <Box>
            <Tooltip title="Settings">
              <IconButton color="white" href="">
                <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="New message">
              <IconButton color="white" href="">
                <MarkEmailReadOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {/* Search */}
        <SearchField />
        {/* <InputSearch /> */}
      </Container>
    </Box>
  );
};
