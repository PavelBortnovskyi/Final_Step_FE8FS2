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
import { myAxios } from 'src/utils/axiosSetup.js';

export const createTweet = createAsyncThunk(
  'tweet/tweet',
  async (tweet, { rejectWithValue }) => {
    try {
      const { postInputText, postImages } = tweet;
      console.log(tweet);
      console.log(postInputText);
      console.log(postImages);


      const formData = new FormData();
      formData.append('tweetBody', postInputText);
      formData.append('file', postImages);

      const data = await myAxios.put("/tweet/tweet", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });


      // const text = 'sdfsdf';

      // const sendText = new FormData();
      // sendText.append('tweetBody', text);

      // const { data } = await myAxios.put('/tweet/tweet', sendText);

      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
