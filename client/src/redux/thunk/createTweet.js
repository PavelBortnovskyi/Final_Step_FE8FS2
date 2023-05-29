// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { setLoading, clearData, setError } from '../reducers/tweetSlice.js';
// import { myAxios } from 'src/utils/axiosSetup.js';

// export const createTweet = createAsyncThunk(
//   'tweet/tweet',
//   async (tweet, { rejectWithValue }) => {
//     try {
//       const { postInputText, postImage, } = tweet;

//       const { data } = await myAxios.put('/tweet/tweet', {
//           "attachmentsImages": 
//             postImage
//           "body": `${postInputText}`,
//       });
//       return data;

//     } catch (error) {
//       const errorMessage = error.response.data || error.message;
//       return rejectWithValue(errorMessage);
//     }
//   }
// );


import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, clearData, setError } from '../reducers/tweetSlice.js';
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweet = createAsyncThunk(
  'tweet/tweet',
  async (tweet, { rejectWithValue }) => {
    try {
      const { postInputText, postImage } = tweet;

      const formData = new FormData();
      formData.append('data', 'postInputText');
      // formData.append('file', [null]);

      const response = await myAxios.put('/tweet/tweet', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
