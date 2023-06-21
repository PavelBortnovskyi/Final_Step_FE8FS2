import { Box, Typography, useTheme } from '@mui/material';
import { UserPageAvatar } from '../User/UserPageAvatar';
import PostImages from 'src/UI/tweet/PostImages';

export const ParentReplise = ({
  userAvatar,
  w,
  h,
  mt,
  fullName,
  useruserTag,
  createdAt,
  body,
  images,
}) => {
  const theme = useTheme();
  const created = new Date(createdAt);
  const month = created.toLocaleString('default', { month: 'long' });
  const day = created.getDay();
  const date = `${month} ${day}`;
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.border.main}`,
        padding: '4px',
        borderRadius: '20px',
      }}
    >
      <Box display={'flex'} gap={'4px'} alignItems={'center'}>
        <UserPageAvatar userAvatar={userAvatar} w={w} h={h} mt={mt} />

        <Typography fontSize={'14px'}>{fullName}</Typography>
        <Typography color={'rgb(139, 152, 165)'}>{useruserTag}</Typography>
        <Typography color={'rgb(139, 152, 165)'}> {date}</Typography>
      </Box>

      <Box display={'flex'}>
        <Box width={'100px'}>
          <PostImages images={images} quantity={images.length} />
        </Box>

        <Typography>{body}</Typography>
      </Box>
    </Box>
  );
};
