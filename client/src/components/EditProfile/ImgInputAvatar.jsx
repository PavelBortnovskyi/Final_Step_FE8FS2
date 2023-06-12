import { Button } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendUserAvatar } from 'src/redux/thunk/sendUserAvatar';

export function ImgInputAvatar() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      const sendAvatar = new FormData();
      sendAvatar.append('file', file);

      dispatch(sendUserAvatar(sendAvatar));
    }
  }, [file, dispatch]);
  return (
    <Button
      variant="conteined"
      component="label"
      sx={{
        borderRadius: '999px',
        background: 'rgb(37 37 37 / 50%)',
        padding: '22px',
        '&:hover': {
          background: 'rgb(37 37 37 / 30%)',
        },
      }}
    >
      <AddAPhotoOutlinedIcon sx={{ fontSize: '18px' }} />
      <input
        name="logo"
        type="file"
        hidden
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        accept="image/png, image/gif, image/jpeg"
      />
    </Button>
  );
}
