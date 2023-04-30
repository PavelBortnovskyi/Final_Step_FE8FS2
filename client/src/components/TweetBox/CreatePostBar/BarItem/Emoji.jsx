import { useState, useEffect, useRef } from 'react';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import style from './iconsRow.module.scss';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

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
    <div className={style.emoji} ref={node}>
      <SentimentSatisfiedAltOutlinedIcon
        onClick={() => setIsPickerVisible(!isPickerVisible)}
      />
      {isPickerVisible && (
        <div className={style.picker} id="emojiModal">
          <Picker
            onEmojiSelect={(e) => {
              handleEmojiSelect(e.native);
            }}
            data={data}
            previewPosition="none"
          />
        </div>
      )}
    </div>
  );
}

export default Emoji;
