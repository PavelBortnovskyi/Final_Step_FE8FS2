import { Form } from 'formik';
import { EditFormHeder } from './EditFormHeder';
import { UserPageFoto } from '../User/UserPageFoto';
import { UserPageAvatar } from '../User/UserPageAvatar';
import { TextField, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ImgInputAvatar } from './ImgInputAvatar';
import { UserPageFotoInput } from './UserPageFotoInput';
import { ClearPageFoto } from './ClearPageFoto';
import { EditBirthDate } from './EditBirthDate';
// import { BirthdayInput } from "./BirthdayInput";

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    color: 'white',
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'transparent',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '& label': {
      color: 'white',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export function EditForm() {
  return (
    <Form>
      <EditFormHeder />
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <UserPageFoto />
        <Box
          sx={{
            display: 'flex',
            gap: '14px',
            height: '64px',
            position: 'absolute',
            bottom: 'calc(50% - 32px)',
            left: 'calc(50% - 50px)',
          }}
        >
          <UserPageFotoInput />
          <ClearPageFoto />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
        }}
      >
        <UserPageAvatar />
        <Box sx={{ position: 'absolute', bottom: '36px', left: '50px' }}>
          <ImgInputAvatar />
        </Box>
      </Box>

      <Box
        sx={{
          padding: '14px',
          '& div': {
            width: '100%',
          },
          '& label': { color: 'white' },
        }}
      >
        <RedditTextField
          label="Name"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Bio"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Location"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <RedditTextField
          label="Website"
          defaultValue=""
          id="reddit-input"
          variant="filled"
          style={{ marginTop: 11 }}
        />
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography style={{ color: 'rgb(139, 152, 165)' }}>
              Birth date
            </Typography>
            <EditBirthDate />
          </Box>
          {/* <BirthdayInput /> */}
          <Typography>Birth date</Typography>
        </Box>
      </Box>
    </Form>
  );
}
