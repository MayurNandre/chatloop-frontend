import { Drawer, Grid, Skeleton } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/event'
import { useErrors, useSocketEvents } from '../../hooks/hook'
import { getOrSaveFromStorage } from '../../lib/features'
import { useMyChatsQuery } from '../../redux/api/api'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc'
import { getSocket } from '../../socket'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'
import Title from "../shared/Title"
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'
import { bgGradient2, blackWhiteGradient, matBlack } from '../../constants/color'

const AppLayout = () => (Wrappedcomponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate()

        const params = useParams();
        const chatId = params.chatId;

        const deleteMenuAnchor = useRef(null);


        const [onlineUsers, setOnlineUsers] = useState([]);

        const socket = getSocket();

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")


        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])


        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            deleteMenuAnchor.current = e.currentTarget;
        }


        const handleMobileClose = () => dispatch(setIsMobile(false))

        const newMessageAlertListner = useCallback((data) => {
            if (data.chatId === chatId) return
            dispatch(setNewMessagesAlert(data))
        }, [chatId])

        const newRequestListner = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch])

        const refetchListner = useCallback(() => {
            refetch();
            navigate("/")
        }, [dispatch, navigate])


        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, [])


        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListner,
            [NEW_REQUEST]: newRequestListner,
            [REFETCH_CHATS]: refetchListner,
            [ONLINE_USERS]: onlineUsersListener
        };

        useSocketEvents(socket, eventHandlers)

        return (
            <>
                <Title />
                <Header />
                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
                {
                    isLoading ? <Skeleton /> : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                            <ChatList
                                w='70vw'
                                chats={data?.chats}
                                ChatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        </Drawer>
                    )
                }
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} height={"100%"}
                        sx={{
                            display: { xs: "none", sm: "block" }
                        }}>
                        {
                            isLoading ? (
                                <Skeleton />
                            ) : (
                                <ChatList
                                    chats={data?.chats}
                                    ChatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />)
                        }
                    </Grid>

                    <Grid item sm={8} md={6} xs={12} height={"100%"}>
                        <Wrappedcomponent {...props}
                            chatId={chatId}
                            user={user} />
                    </Grid>

                    <Grid item md={3} lg={3} height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            background: "black"
                        }}>
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default AppLayout
