import { myAxios } from 'src/utils/axiosSetup';

// get all chat from DB
export const getChatAll = async (page = 0, pageSize = 10) => {
  try {
    const { data } = await myAxios.get(
      `/chat/all?page=${page}&pageSize=${pageSize}`
    );
    return data;
  } catch (error) {
    console.log('Error getChatAll connection', error);
  }
};
