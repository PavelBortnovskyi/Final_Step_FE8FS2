import { Tab, Tabs } from '@mui/material';
import React from 'react'



const CustomTab = styled(Tab)((props) => ({
  fontWeight: '800',
  width: '50%',
  textTransform: 'capitalize',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b3b3b32b',
  },
}));

export const TabsBtn = () => {
  return (
    <Tabs value={tabIndex} onChange={handleTabChange}>
        <CustomTab label="For you" />
        <CustomTab label="Following" />
      </Tabs>
  )
}
