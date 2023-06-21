import { Box } from '@mui/material';

import { UserPageAvatar } from '../User/UserPageAvatar';
import { TweetReplise } from './TweetReplise';
import { ParentReplise } from './ParentReplise';
import { Link } from 'react-router-dom';

export const UserReplise = ({ replise }) => {
  const userReplise = replise;
  return (
    userReplise &&
    replise.map((replis) => {
      const userId = replis.user.id;
      const images = replis.attachmentImages || [];
      const userAvatar = replis.user.avatarImgUrl;
      const userfullName = replis.user.fullName;
      const useruserTag = replis.user.userTag;
      const createdAt = replis.createdAt;
      const userBody = replis.body;

      const parentImgs = replis.parentTweet?.attachmentImages || [];
      const parentAvatar = replis.parentTweet?.user.avatarImgUrl;
      const parentFullName = replis.parentTweet?.user.fullName;
      const parentUserTag = replis.parentTweet?.user.userTag;
      const parentCreatedAt = replis.parentTweet?.createdAt;
      const parentBody = replis.parentTweet?.body;
      return (
        <Box
          key={replis.id}
          display={'flex'}
          flexDirection={'row'}
          gap={'8px'}
          marginTop={'12px'}
          marginRight={'16px'}
        >
          <UserPageAvatar userAvatar={userAvatar} w={'38'} h={'38'} mt={'0'} />

          {/* tweet */}
          <Box width={'99%'}>
            <TweetReplise
              fullName={userfullName}
              useruserTag={useruserTag}
              createdAt={createdAt}
              body={userBody}
              images={images}
              quantity={images.length}
            />

            {/* parent */}
            <ParentReplise
              userAvatar={parentAvatar}
              w={'19'}
              h={'19'}
              mt={'0'}
              fullName={parentFullName}
              useruserTag={parentUserTag}
              createdAt={parentCreatedAt}
              body={parentBody}
              images={parentImgs}
              quantity={parentImgs.length}
            />
          </Box>
        </Box>
      );
    })
  );
};
