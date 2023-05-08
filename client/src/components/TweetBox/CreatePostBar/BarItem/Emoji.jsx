import { useState, useEffect, useRef } from 'react';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Box } from '@mui/material';

function Emoji({ handleEmojiSelect }) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const node = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      setIsPickerVisible(false);
    };

    if (isPickerVisible) {
      document.addEventListener('click', handleOutsideClick, false);
    } else {
      document.removeEventListener('click', handleOutsideClick, false);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [isPickerVisible]);

  return (
    <Box sx={{ cursor: 'pointer', position: 'relative' }} ref={node}>
      <SentimentSatisfiedAltOutlinedIcon
        sx={{
          fill: 'rgb(29, 155, 240)',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(24, 44, 63)',
            borderRadius: '50%',
          },
        }}
        onClick={() => setIsPickerVisible(!isPickerVisible)}
      />
      {isPickerVisible && (
        <Box sx={{ position: 'absolute' }} id="emojiModal">
          <Picker
            onEmojiSelect={(e) => {
              handleEmojiSelect(e.native);
            }}
            data={data}
            previewPosition="none"
          />
        </Box>
      )}
    </Box>
  );
}
export default Emoji;
