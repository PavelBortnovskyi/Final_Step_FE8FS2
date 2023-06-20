import { Button } from '@mui/material';
import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

export const ArrowBack = () => {
  const navigate = useNavigate();
  const handleBack = async () => {
    navigate(-1);
  };

  return (
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
  )
}
