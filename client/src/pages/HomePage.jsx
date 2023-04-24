import MainPage_header from 'src/components/MainPage_header/MainPage_header';
import Post from 'src/components/Post/Post';
import TweetBox from 'src/components/TweetBox/TweetBox';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <MainPage_header />
      <TweetBox />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={false}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://31.media.tumblr.com/b00badbaad9a499a16f36c6ecd1ddccb/tumblr_mkygq9DYRb1ryx1p2o1_400.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://chasingtheturtle.files.wordpress.com/2014/09/pusheen-dragonborn-pusheen-the-cat-26867867-350-350.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/d4sPgSJml54AAAAC/opihomm-funny.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/7TzEQ2nkWscAAAAM/funny-memes-discord.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/WBcY8E7vVCoAAAAM/monkey-computer-not-working.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/pIPJ7mJZ2bUAAAAd/man-destroys-pc-harold-slikk-new.gif"
      />
      <Post
        displayName="Artem Shevchuk"
        username="Jocellyn Flores"
        verified={true}
        text="This glorious backpack has been on many adventures now. It is comfortable, holds a ton which the/a packing cube to increase this. Honestly it is surprising how much it holds. I’m also not the gentlest with my backpacks and this one has help up.."
        image="https://media.tenor.com/7TzEQ2nkWscAAAAM/funny-memes-discord.gif"
      />
    </div>
  );
};
