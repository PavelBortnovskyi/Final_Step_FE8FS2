import { Field, Form } from 'formik';

import { EditFormHeder } from './EditFormHeder';
import { UserPageFoto } from '../User/UserPageFoto';
import { UserPageAvatar } from '../User/UserPageAvatar';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';

import { EditBirthDate } from './EditBirthDate';
import { EditInput } from './EditInput';
import { UserPageFotoInput } from './UserPageFotoInput';
import { ImgInputAvatar } from './ImgInputAvatar';
import { useSelector } from 'react-redux';

export function EditForm() {
  const userHederFoto = useSelector((state) => state.user.user) || '';
  return (
    <Form>
      <EditFormHeder />
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <UserPageFoto hederImg={userHederFoto.headerImgUrl} />
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
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
        }}
      >
        <UserPageAvatar
          w={'140'}
          h={'140'}
          mt={'-70'}
          userAvatar={userHederFoto.avatarImgUrl}
        />
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
        <Field name="fullName" type="text" label="Name" component={EditInput} />

        <Field name="bio" type="text" label="Bio" component={EditInput} />

        <Field
          name="location"
          type="text"
          label="location"
          component={EditInput}
        />

        {/* <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "rgb(139, 152, 165)" }}>
              Birth date
            </Typography>
            <EditBirthDate />
          </Box>

          <Typography>Birth date</Typography>
        </Box> */}
      </Box>
    </Form>
  );
}
