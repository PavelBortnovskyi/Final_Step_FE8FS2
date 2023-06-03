import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "src/utils/axiosSetup";

export const getFollowings = createAsyncThunk(
  "user/followings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.get(`/user/followings`);
      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
