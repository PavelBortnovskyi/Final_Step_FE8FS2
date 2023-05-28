// import React from 'react';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { Box } from '@mui/material';
// import Masonry from 'react-masonry-css';

// const imgStyle = {
//   width: '100%',
//   borderRadius: '10%',
// };

// function AddingFile({ images, handleDeleteImage }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexWrap: 'wrap',
//       }}
//     >
//       {images.map((item, index) => {
//         return (
//           <Box sx={{ position: 'relative', margin: '30px' }} key={index}>
//             <div onClick={() => handleDeleteImage(index)}>
//               <CancelIcon
//                 sx={{
//                   position: 'absolute',
//                   top: '15px',
//                   left: '30px',
//                   color: 'black',
//                   '&:hover': {
//                     cursor: 'pointer',
//                     transition: 'linear, 500ms',
//                     transform: 'scale(1.3)',
//                   },
//                 }}
//               />
//             </div>
//             <img
//               style={imgStyle}
//               src={URL.createObjectURL(item)}
//               alt="Adding image"
//             />
//           </Box>
//         );
//       })}
//     </Box>
//   );
// }

// export default AddingFile;

import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

const imgStyle = {
  width: '100%',
  borderRadius: '10%',
};

function AddingFile({ images, handleDeleteImage }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
    >
      {images.map((item, index) => (
        <Box key={index} sx={{ position: 'relative', margin: '30px' }}>
          <div onClick={() => handleDeleteImage(index)}>
            <CancelIcon
              sx={{
                position: 'absolute',
                top: '15px',
                left: '30px',
                color: 'black',
                '&:hover': {
                  cursor: 'pointer',
                  transition: 'linear, 500ms',
                  transform: 'scale(1.3)',
                },
              }}
            />
          </div>
          <img
            style={imgStyle}
            src={URL.createObjectURL(item)}
            alt="Adding image"
          />
        </Box>
      ))}
    </Box>
  );
}

export default AddingFile;
