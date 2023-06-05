import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "src/utils/axiosSetup";

export const getFollowers = createAsyncThunk(
  "user/followers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.get(`/user/profile/followers`);

      return data;
    } catch (error) {
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
