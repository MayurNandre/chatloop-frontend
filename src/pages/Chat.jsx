import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponent';
import { grayColor, matBlack, orange } from '../constants/color';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/event';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useInfiniteScrollTop } from '6pp'

import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { getSocket } from '../socket';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { TypingLoader } from '../components/layout/Loaders.jsx';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';



const Chat = ({ chatId, user }) => {
  const navigate = useNavigate()

  const socket = getSocket();
  const dispatch = useDispatch();

  const containerRef = useRef(null)
  const bottomRef = useRef(null)

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const [fileMenuAnchor, SetFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState("");
  const typingTimeout = useRef(null)


  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page })

  //Infinte Scroll
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )


  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }
  ];

  const members = chatDetails?.data?.chat?.members;

  //Message Input In Chat
  const messageChangeHandler = (e) => {
    setMessage(e.target.value)
    // When Typing
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    // When Stop Typing
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [1500])
  }

  //Attachment/File Open Handler
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    SetFileMenuAnchor(e.currentTarget);
  };

  //Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Emiting to server
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
  }

  //When chat change
  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId))
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1)
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    }
  }, [chatId])

  // When New Msg -- scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userTyping])

  //If chat youre accessing is not for you
  useEffect(() => {
    if (chatDetails.isError) return navigate("/")
  }, [chatDetails.isError])

  // Listners (Socket)
  const newMessagesListner = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message])
  }, [chatId])

  const startTypingListner = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(true)
  }, [chatId])

  const stopTypingListner = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false)
  }, [chatId])

  const alertListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) {

      }
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "seckui",
          name: "Admin"
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, messageForAlert])
    }, [chatId])

  const eventHandlers = {
    [ALERT]: alertListner,
    [NEW_MESSAGE]: newMessagesListner,
    [START_TYPING]: startTypingListner,
    [STOP_TYPING]: stopTypingListner
  };

  useSocketEvents(socket, eventHandlers)

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages]

  return chatDetails.isLoading ? (<Skeleton />) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflow: "hidden",
          overflowY: "auto"
        }}
      >
        {/* Messages Rendering */}
        {
          allMessages.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
        {/* Messages Rendering End*/}

        {/* Typing Component */}
        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />

      </Stack>

      {/* Form Start */}
     <form
  onSubmit={submitHandler}
  style={{
    width: "100%",
    boxSizing: "border-box"
  }}
>
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    sx={{
      borderRadius: "2rem",
      padding: "0.5rem 1rem",
      position: "relative"
    }}
  >
    <IconButton
      onClick={handleFileOpen}
      sx={{
        position: "absolute",
        left: "1.5rem",
        zIndex: 1,
        rotate: "30deg",
        color: matBlack
      }}
    >
      <AttachFileIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" } }} />
    </IconButton>

    <InputBox
      placeholder="Type message here..."
      value={message}
      onChange={messageChangeHandler}
      sx={{
        color:matBlack,
        backgroundColor: grayColor,
        paddingLeft: "3rem",
        paddingRight: "1rem",
        height: { xs: "2rem", sm: "2rem", md: "2.8rem" },
        fontSize: "1rem",
        flex: 1
      }}
    />

    <IconButton
      type="submit"
      sx={{
        fontSize: "0.5rem",
        rotate: "-30deg",
        bgcolor: orange,
        color: "white",
        padding: "0.6rem",
        "&:hover": {
          bgcolor: "error.dark"
        }
      }}
    >
      <SendIcon sx={{ fontSize: { xs: "small", sm: "medium", md: "large" } }} />
    </IconButton>
  </Stack>
</form>


      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  )
}

export default AppLayout()(Chat);
