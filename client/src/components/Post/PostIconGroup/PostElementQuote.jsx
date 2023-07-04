import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetByIdThunk';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const PostElementQuote = ({ icon, quantity, color, id, isQuoted }) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getTweetByIdThunk({ id }));
      setIsModalOpen(!isModalOpen);
    }
  }, [isModalOpen]);
  return (
    <Box
      onClick={() => setIsModalOpen(true)}
      display="flex"
      fontSize="15px"
      color={isQuoted !== false ? `${color}` : `${theme.palette.text.primary}`}
      sx={{
        gap: '10px',
        '&:hover': {
          color: { color },
          cursor: 'pointer',
          '.MuiSvgIcon-root': {
            fill: color,
          },
        },
      }}
    >
      {isQuoted ? (
        <EditOutlinedIcon size="small" sx={{ color: { color } }} />
      ) : (
        icon
      )}
      {quantity}
    </Box>
  );
};
