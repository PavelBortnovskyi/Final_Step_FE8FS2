import React from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import style from './iconsRow.module.scss';

function AddImage() {
  return (
    <div className={style.iconImg}>
      <label for="file">
        <input type="file" id="file" className={style.input} />
        <ImageOutlinedIcon />
      </label>
    </div>
  );
}

export default AddImage;
