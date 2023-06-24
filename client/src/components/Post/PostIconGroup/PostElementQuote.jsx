import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuote } from 'src/redux/thunk/tweets/addQuote';
import { getTweetByIdThunk } from 'src/redux/thunk/tweets/getTweetByIdThunk';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

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
        <BorderColorOutlinedIcon size="small" sx={{ color: { color } }} />
      ) : (
        icon
      )}
      {quantity}
    </Box>
  );
};
