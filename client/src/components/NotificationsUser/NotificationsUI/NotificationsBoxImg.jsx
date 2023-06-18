import { Box, styled } from '@mui/material';
import React from 'react'


const CustomImg = styled(Box)(({ img }) => {
  return ({
    width: '48%',
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });
})


export const NotificationsBoxImg = ({ Images, pl }) => {
  return (
    <Box sx={{ paddingLeft: `${pl}px` }}>
                {/* if img = 1 */}
                {Images.length === 1 && (
                  <Box sx={{ height: '100px', paddingTop: '10px', display: 'flex', gap: '8px' }}>
                    {Images.map((img, index) => (
                      <CustomImg img={img.imgUrl} key={index}></CustomImg>
                    ))}
                  </Box>
                )}

                {/* if img = 2 */}
                {Images.length === 2 && (
                  <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '8px' }} >
                    {Images.map((img, index) => (
                      <CustomImg img={img.imgUrl} key={index} ></CustomImg>
                    ))}
                  </Box>
                )}

                {/* if img > 2 */}
                {Images.length > 2 && (
                  <Box sx={{ paddingTop: '10px', height: '100px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    {Images.map((img, index) => (
                      <CustomImg img={img.imgUrl} key={index} ></CustomImg>
                    ))}
                  </Box>
                )}
              </Box>
  )
}
