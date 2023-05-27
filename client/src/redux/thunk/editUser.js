import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "src/utils/axiosSetup";
import { getUser } from "src/redux/thunk/getUser";

export const editUser = createAsyncThunk(
  "user/profile",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { fullName, bio, birthDate, location, userTag } = user;

      // request for server
      const { data } = await myAxios.put("/user/profile", {
        fullName,
        bio,
        userTag,
        birthDate,
        location,
      });

      // if a token is received, store it in localStorage
      if (data.ACCESS_TOKEN) {
        window.localStorage.setItem("accessToken", data.ACCESS_TOKEN);

        // get user data
      }
      dispatch(getUser());
      return data;
    } catch (error) {
      // set message error from server
      const errorMessage = error.response.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
