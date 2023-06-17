import { Box, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const SinglePhoto = styled(Box)({
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '20px',
});

const DoublePhoto = styled(Box)({
  gap: '2px',
  overflow: 'hidden',
  borderRadius: '20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
});

const TriplePhoto = styled(Box)({
  gap: '2px',
  overflow: 'hidden',
  borderRadius: '20px',
  maxHeight: '290px',
  maxWidth: '515px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(8, 1fr)',
});

const QuadruplePhoto = styled(Box)({
  gap: '2px',
  overflow: 'hidden',
  borderRadius: '20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
});

function TweetImages({ images }) {
  let quantity = images.length;

  let QuantityComponent;
  if (quantity === 1) {
    QuantityComponent = SinglePhoto;
  } else if (quantity === 2) {
    QuantityComponent = DoublePhoto;
  } else if (quantity === 3) {
    QuantityComponent = TriplePhoto;
  } else if (quantity === 4) {
    QuantityComponent = QuadruplePhoto;
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
    <QuantityComponent sx={{ mt: '10px' }}>
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
    </QuantityComponent>
  );
}

export default TweetImages;
