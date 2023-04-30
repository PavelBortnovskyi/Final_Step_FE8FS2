import React from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import style from './iconsRow.module.scss';

function AddImage({ handleFileSelect }) {
  return (
    <div className={style.iconImg}>
      <label>
        <input
          type="file"
          id="file"
          className={style.input}
          onChange={(e) => {
            handleFileSelect(e.target.files[0]);
          }}
        />
        <ImageOutlinedIcon />
      </label>
    </div>
  );
}

export default AddImage;
