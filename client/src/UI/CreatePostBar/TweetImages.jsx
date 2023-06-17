import { Box, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const postPhoto = makeStyles((theme) => ({
  singlePhoto: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '20px',
  },
  doublePhoto: {
    gap: '2px',
    overflow: 'hidden',
    borderRadius: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  triplePhoto: {
    gap: '2px',
    overflow: 'hidden',
    borderRadius: '20px',
    maxHeight: '290px',
    maxWidth: '515px',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
  },
  quadruplePhoto: {
    gap: '2px',
    overflow: 'hidden',
    borderRadius: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
}));

function TweetImages({ images }) {
  const classes = postPhoto();
  let quantity = images.length;

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
          maxWidth: '250px',
        };
      } else if (index === 1) {
        style = {
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
    <Box className={quantityClass} sx={{ mt: '10px' }}>
      {images
        ? images.map((img, index) => {
            return (
              <Box
                key={img.imgUrl}
                sx={{
                  ...photoStyles(index, img.imgUrl),
                }}
              >
                <CardMedia
                  key={img.imgUrl}
                  component="img"
                  height="auto"
                  image={img.imgUrl}
                  alt="tweet img"
                />
              </Box>
            );
          })
        : null}
    </Box>
  );
}

export default TweetImages;
