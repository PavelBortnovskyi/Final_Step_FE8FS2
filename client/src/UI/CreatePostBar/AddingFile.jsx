// import React from 'react';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import { makeStyles } from '@mui/styles';
// import { Box } from '@mui/material';

// const imgStyle = {
//   width: '100%',
//   borderRadius: '5%',
//   maxHeight: '600px',
// };

// const useStyles = makeStyles((theme) => ({
//   singlePhoto: {
//     padding: '10px',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   doublePhoto: {
//     padding: '10px',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '10px',
//   },
//   triplePhoto: {
//     padding: '10px',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(8, 1fr)',
//     gridTemplateRows: 'repeat(8, 1fr)',
//     gap: '10px',
//   },
//   quadruplePhoto: {
//     padding: '10px',
//     display: 'grid',
//     gap: '10px',
//     gridTemplateColumns: '1fr 1fr',
//     gridTemplateRows: '1fr 1fr',
//   },
// }));

// function AddingFile({ images, handleDeleteImage, quantity }) {
//   const classes = useStyles();

//   let quantityClass;
//   if (quantity === 1) {
//     quantityClass = classes.singlePhoto;
//   } else if (quantity === 2) {
//     quantityClass = classes.doublePhoto;
//   } else if (quantity === 3) {
//     quantityClass = classes.triplePhoto;
//   } else if (quantity === 4) {
//     quantityClass = classes.quadruplePhoto;
//   }

//   const photoStyles = (index, img) => {
//     let style = {};
//     if (quantity === 3) {
//       if (index === 0) {
//         style = {
//           gridRow: '1 / span 8',
//           gridColumn: '1 / span 4',
//           width: '250px',
//         };
//       } else if (index === 1) {
//         style = {
//           borderRadius: '5%',
//           gridRow: '1 / span 4',
//           gridColumn: '5 / span 8',
//           backgroundImage: `url(${img})`,
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           img: {
//             display: 'none',
//           },
//         };
//       } else if (index === 2) {
//         style = {
//           borderRadius: '5%',
//           gridRow: '5 / span 4',
//           gridColumn: '5 / span 8',
//           backgroundImage: `url(${img})`,
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           img: {
//             display: 'none',
//           },
//         };
//       }
//     }
//     return style;
//   };

//   return (
//     <Box className={quantityClass}>
//       {images.map((item, index) => (
//         <Box
//           key={index}
//           sx={{
//             position: 'relative',

//             ...photoStyles(index, URL.createObjectURL(item) || ''),
//           }}
//         >
//           <div onClick={() => handleDeleteImage(index)}>
//             <CancelRoundedIcon
//               sx={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '15px',
//                 color: '#fff',
//                 '&:hover': {
//                   cursor: 'pointer',
//                   transition: 'linear, 500ms',
//                   transform: 'scale(1.3)',
//                 },
//               }}
//             />
//           </div>
//           <img
//             style={imgStyle}
//             src={URL.createObjectURL(item)}
//             alt="Adding image"
//           />
//         </Box>
//       ))}
//     </Box>
//   );
// }

// export default AddingFile;

import React from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const imgStyle = {
  width: '100%',
  borderRadius: '5%',
  maxHeight: '600px',
};

const useStyles = makeStyles((theme) => ({
  singlePhoto: {
    padding: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  doublePhoto: {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  triplePhoto: {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
    gap: '10px',
  },
  quadruplePhoto: {
    padding: '10px',
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
}));

function AddingFile({ images, handleDeleteImage, quantity }) {
  const classes = useStyles();

  let quantityClass;
  if (quantity === 1) {
    quantityClass = classes.singlePhoto;
  } else if (quantity === 2) {
    quantityClass = classes.doublePhoto;
  } else if (quantity === 3) {
    quantityClass = classes.triplePhoto;
  } else if (quantity === 4) {
    quantityClass = classes.quadruplePhoto;
  }

  const photoStyles = (index, img) => {
    let style = {};
    if (quantity === 3) {
      if (index === 0) {
        style = {
          gridRow: '1 / span 8',
          gridColumn: '1 / span 4',
          width: '250px',
        };
      } else if (index === 1) {
        style = {
          borderRadius: '5%',
          gridRow: '1 / span 4',
          gridColumn: '5 / span 8',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          img: {
            display: 'none',
          },
        };
      } else if (index === 2) {
        style = {
          borderRadius: '5%',
          gridRow: '5 / span 4',
          gridColumn: '5 / span 8',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          img: {
            display: 'none',
          },
        };
      }
    }
    return style;
  };

  return (
    <Box className={quantityClass}>
      {images.map((item, index) => {
        if (!item) {
          return null; // Пропустити видалені елементи
        }

        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              ...photoStyles(index, URL.createObjectURL(item) || ''),
            }}
          >
            <div onClick={() => handleDeleteImage(index)}>
              <CancelRoundedIcon
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: '15px',
                  color: '#fff',
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
        );
      })}
    </Box>
  );
}

export default AddingFile;
