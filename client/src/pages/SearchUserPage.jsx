import { Box } from '@mui/material'
import React from 'react'
import { ArrowBack } from 'src/UI/ArrowBack'
import { SearchField } from 'src/UI/SearchField'
import { SearchPeople } from 'src/components/RightSection/SearchPeople'

export const SearchUserPage = () => {
  return (
    <Box sx={{ margin: "16px", }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: "16px", }}>
        <ArrowBack />
        <SearchField />
      </Box>

      <SearchPeople />
    </Box>
  )
}
