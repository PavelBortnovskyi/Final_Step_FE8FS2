import { useState, useEffect } from 'react';

export const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // find other users
    const userId = data.members.find((id) => id !== currentUserId);

    // get users data
    const getUserData = async () => {
      try {
        // TODO: getUser(id): get users from server in redux, path: /user/:userId
        const { data } = await getUser(userId);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [currentUserId, data]);

  return (
    <div className={`${styles.follower} ${styles.conversation}`}>
      {online && <div className={styles.onlineDot}></div>}
      <div>userLogo</div>
      <div>
        {userData?.firstname} {userData?.lastname}
      </div>
      <div>{online ? 'online' : 'offline'}</div>
    </div>
  );
};
