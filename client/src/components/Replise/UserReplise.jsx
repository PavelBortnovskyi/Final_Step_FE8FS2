import { Box, useTheme } from '@mui/material';
import { TweetReplise } from './TweetReplise';

export const UserReplise = ({ replise }) => {
  const theme = useTheme();
  const userReplise = replise;

  function renderParentReplise(paren) {
    const images = paren?.attachmentImages || [];
    const userfullName = paren?.user.fullName;
    const useruserTag = paren?.userTag;
    const createdAt = paren?.createdAt;
    const userBody = paren?.body;

    const parentImgs = paren?.attachmentImages || [];
    const parentAvatar = paren?.user.avatarImgUrl;
    const parentFullName = paren?.user.fullName;
    const parentUserTag = paren?.user.userTag;
    const parentCreatedAt = paren?.createdAt;
    const parentBody = paren?.body;

    if (paren?.parentTweet === null) {
      return (
        paren && (
          <Box>
            <TweetReplise
              paren={paren}
              userAvatar={parentAvatar}
              w={'38'}
              h={'38'}
              mt={'0'}
              fullName={userfullName}
              useruserTag={useruserTag}
              createdAt={createdAt}
              body={userBody}
              images={images}
              quantity={images.length}
            />
          </Box>
        )
      );
    } else if (paren?.parentTweet !== null) {
      return (
        paren.parentTweet && (
          <Box>
            {renderParentReplise(paren.parentTweet)}
            <TweetReplise
              paren={paren}
              userAvatar={parentAvatar}
              w={'38'}
              h={'38'}
              mt={'0'}
              fullName={parentFullName}
              useruserTag={parentUserTag}
              createdAt={parentCreatedAt}
              body={parentBody}
              images={parentImgs}
              quantity={paren?.parentImgs?.length}
            />
          </Box>
        )
      );
    }
  }

  return (
    userReplise &&
    replise.map((replis) => {
      return (
        <Box key={replis.id}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={'8px'}
            borderBottom={`1px solid ${theme.palette.border.main}`}
            width={'100%'}
          >
            <Box sx={{ width: '100%' }}>{renderParentReplise(replis)}</Box>
          </Box>
        </Box>
      );
    })
  );
};
