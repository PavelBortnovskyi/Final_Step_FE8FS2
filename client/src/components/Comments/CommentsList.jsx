import { Box } from '@mui/material';
import React from 'react';
import TweetPost from 'src/UI/TweetPost';

function CommentsList() {
  return (
    <Box>
      <TweetPost
        displayName="Look at my logo "
        username="kurva ebana"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://pbs.twimg.com/media/FwEzh09WAAEEwBT?format=jpg&name=900x900"
        logoUrl="https://pbs.twimg.com/media/FwAWfJpWIAQZTLs?format=jpg&name=small"
        showIconList={true}
      />
      <TweetPost
        displayName="IndiGenBharat"
        username="IndiGenBharat"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a "
        logoUrl="/img/avatar.JPG"
        showIconList={true}
      />
      <TweetPost
        displayName="Japanese Pussy"
        username="Japanese Pussy"
        verified={true}
        text="here is even bigger conspiracy behind it. CGI was as good as today in 1969 but government deliberately concealed it at that time and purposefully rolled out bad CGI so to prevent the public from discovering that the moon landing was faked."
        logoUrl="https://pbs.twimg.com/profile_images/1629257728559284229/-OAILDWr_400x400.jpg"
        showIconList={true}
      />
      <TweetPost
        displayName="Robert Genito 🐬"
        username="IndiGenBharat"
        verified={false}
        text="More accurately said: “the government used Hollywood to fake the moon landings”. Look at all of the moon footage. Some of it is ridiculous… and comical special effects of the lander “shooting” back into space lol. People love being lied to "
        logoUrl="/img/avatar.JPG"
        showIconList={true}
      />
      <TweetPost
        displayName="Anthony ☯️"
        username="306Mindset"
        verified={false}
        text="There is no moon it's a projection, sry wolf."
        image="https://pbs.twimg.com/media/FwDtnfbWAAAAcqR?format=jpg&name=4096x4096"
        logoUrl="/img/avatar.JPG"
        showIconList={true}
      />
      <TweetPost
        displayName="J.J."
        username="jljaniszewski"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/7TzEQ2nkWscAAAAM/funny-memes-discord.gif"
        logoUrl="/img/avatar.JPG"
        showIconList={true}
      />
      <TweetPost
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://pbs.twimg.com/media/FpWynZyWIAU4z4e?format=png&name=small"
        logoUrl="/img/avatar.JPG"
        showIconList={true}
      />
    </Box>
  );
}

export default CommentsList;
