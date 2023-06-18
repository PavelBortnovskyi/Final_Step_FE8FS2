import React from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const imgStyle = {
  width: '100%',
  borderRadius: '5%',
  maxHeight: '600px',
};

const SinglePhoto = styled(Box)({
  padding: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const DoublePhoto = styled(Box)({
  padding: '10px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
});

const TriplePhoto = styled(Box)({
  padding: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(8, 1fr)',
  gap: '10px',
});

const QuadruplePhoto = styled(Box)({
  padding: '10px',
  display: 'grid',
  gap: '10px',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
});

function AddingFile({ images, handleDeleteImage, quantity }) {
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
    <QuantityComponent>
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
    </QuantityComponent>
  );
}

export default AddingFile;
