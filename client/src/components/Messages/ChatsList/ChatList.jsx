import { useEffect, useState } from 'react';
import { Conversation } from './Conversation';

export const ChatList = () => {
  // set chats where user be
  const [chats, setChats] = useState([]);

  // current chat
  const [currentChat, setCurrentChat] = useState(null);

  // set current chat
  const handleCurrentChat = (chat) => {
    setCurrentChat(chat);
  };

  // get chats
  useEffect(() => {
    const getChats = async () => {
      try {
        // request user chats from server
        // TODO: get(`/chat/${id}`)
        const { data } = await userChats(user.id);

        // set chats
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, []);

  return (
    <div className="ChatList">
      {chats.map((chat, index) => (
        <div
          className="xxx"
          key={index}
          onClick={() => handleCurrentChat(chat)}
        >
          <Conversation
            data={chat}
            currentUserId={user.id}
            // online={checkOnlineStatus(chat)}
            online={true}
          />
        </div>
      ))}
    </div>
  );
};
