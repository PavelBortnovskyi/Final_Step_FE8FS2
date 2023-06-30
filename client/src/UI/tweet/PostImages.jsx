import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const SinglePhoto = styled(Box)({
  mt: '10px',
  overflow: 'hidden',
  // width: '90%',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '20px',
  loading: 'lazy',
});

const DoublePhoto = styled(Box)({
  mt: '10px',
  gap: '2px',
  // width: '90%',
  overflow: 'hidden',
  borderRadius: '20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  img: {
    height: '290px',
    loading: 'lazy',
  },
});

const TriplePhoto = styled(Box)({
  mt: '10px',
  gap: '2px',
  // width: '90%',
  overflow: 'hidden',
  borderRadius: '20px',
  maxHeight: '290px',
  width: '515px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(8, 1fr)',
  loading: 'lazy',
});

const QuadruplePhoto = styled(Box)({
  ml: { sm: '5px', md: '20px', xl: '64px' },
  mt: '10px',
  height: '515px',
  // width: { sm: '100%', md: '90%' },
  gap: '2px',
  overflow: 'hidden',
  borderRadius: '20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '250px 250px',
  img: {
    height: '290px',
    loading: 'lazy',
  },
});

function PostImages({ images, quantity }) {
  let PhotoComponent;
  switch (quantity) {
    case 1:
      PhotoComponent = SinglePhoto;
      break;
    case 2:
      PhotoComponent = DoublePhoto;
      break;
    case 3:
      PhotoComponent = TriplePhoto;
      break;
    case 4:
      PhotoComponent = QuadruplePhoto;
      break;
    default:
      PhotoComponent = SinglePhoto;
      break;
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
        };
      } else if (index === 2) {
        style = {
          gridRow: '5 / span 4',
          gridColumn: '5 / span 8',
        };
      }
    }
    return style;
  };

  return (
    <PhotoComponent sx={{ mt: '10px' }}>
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
                  loading="lazy"
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
    </PhotoComponent>
  );
}

export default PostImages;
