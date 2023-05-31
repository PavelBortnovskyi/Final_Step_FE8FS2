import { Box, Typography } from '@mui/material'
import React from 'react'

export const PageDeveloping = () => {
  return (
      <Box
        sx={{
          height: '100vh',
          width: '100%'
        }}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          This page is still under construction
        </Typography>
      </Box>
  )
}
