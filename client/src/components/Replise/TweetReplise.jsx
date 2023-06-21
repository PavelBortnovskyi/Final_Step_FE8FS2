import { Box, Typography } from '@mui/material';

import PostImages from 'src/UI/tweet/PostImages';

export const TweetReplise = ({
  fullName,
  useruserTag,
  createdAt,
  body,
  images,
}) => {
  const created = new Date(createdAt);
  const month = created.toLocaleString('default', { month: 'long' });
  const day = created.getDay();
  const date = `${month} ${day}`;

  return (
    <Box>
      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
        <Typography fontSize={'18px'}>{fullName}</Typography>
        <Typography color={'rgb(139, 152, 165)'}>{useruserTag}</Typography>
        <Typography color={'rgb(139, 152, 165)'}> {date}</Typography>
      </Box>

      <Typography>{body}</Typography>
      <PostImages images={images} quantity={images.length} />
    </Box>
  );
};
