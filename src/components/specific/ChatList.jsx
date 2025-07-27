import { Stack } from '@mui/material';
import Chatitem from '../shared/Chatitem';


const ChatList = ({
    w = "100%",
    chats = [],
    ChatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            ChatId: "",
            count: 0
        }
    ],
    handleDeleteChat,

}) => {

    return <Stack

        width={w}
        direction={"column"}
        overflow={"auto"}
        height={"100%"}>
        {
            chats?.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(
                    ({ chatId }) => chatId === _id
                );

                const isOnline = members?.some((member) => onlineUsers.includes(member));

                return <Chatitem
                    index={index}
                    newMessageAlert={newMessageAlert}
                    isOnline={isOnline}
                    avatar={avatar}
                    name={name}
                    _id={_id}
                    key={_id}
                    groupChat={groupChat}
                    sameSender={ChatId === _id}
                    handleDeleteChat={handleDeleteChat}
                />

            })
        }
    </Stack>
}

export default ChatList
