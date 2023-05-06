import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HomePageHeder.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function MainPage_header() {
  const [openForYou, setOpenForYou] = useState(true);
  const [openFolowing, setOpenFlowing] = useState(false);

  const handleOpenForYou = () => {
    setOpenFlowing(false);
    setOpenForYou(true);
  };
  const handleOpenFlowing = () => {
    setOpenForYou(false);
    setOpenFlowing(true);
  };

  return (
    <div className={styles.homeHeder}>
      <NavLink to="/" className={styles.hed}>
        <div>Home</div>
      </NavLink>
      <div>
        <Box
          sx={{
            '& button': {
              padding: '15px',
              width: '50%',
              borderRadius: '0',
              color: 'rgb(255, 255, 255)',
              '&:hover': {
                backgroundColor: '#b3b3b32b',
              },
            },
          }}
        >
          <Button
            className={openForYou ? styles.btn_active : styles.btn}
            size="medium"
            onClick={handleOpenForYou}
          >
            <p>For you</p>
          </Button>
          <Button
            className={openFolowing ? styles.btn_active : styles.btn}
            size="medium"
            onClick={handleOpenFlowing}
          >
            <p> Folowing</p>
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default MainPage_header;
