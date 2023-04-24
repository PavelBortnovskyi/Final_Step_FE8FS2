import { useState } from 'react';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import style from './iconsRow.module.scss';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

function Emoji() {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <div className={style.emoji}>
      <SentimentSatisfiedAltOutlinedIcon
        onClick={() => setIsPickerVisible(!isPickerVisible)}
      />
      {isPickerVisible && (
        <div className={style.picker}>
          <Picker data={data} previewPosition="none" />
        </div>
      )}
    </div>
  );
}

export default Emoji;
