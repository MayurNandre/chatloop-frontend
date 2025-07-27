import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import { IconButton, Menu, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';
import { useEffect } from 'react';

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {

    const navigate = useNavigate("")

    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc);
    const isGroup = selectedDeleteChat.groupChat;

    // RTK
    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)


    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current = null;
    }
    const leaveGroupHandler = () => {
        closeHandler();
        console.log(selectedDeleteChat)
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    }

    const deleteChatHandler = () => {
        closeHandler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    }

    useEffect(() => {
        if (deleteChatData || leaveGroupData) navigate("/")
    }, [deleteChatData, leaveGroupData])

    return (
        <Menu
            open={isDeleteMenu}
            onClose={closeHandler}
            anchorEl={deleteMenuAnchor.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
        >
            <Stack
                sx={{
                    width: "12rem",
                    padding: "0.5rem",
                    position: "relative",
                    cursor: "pointer"
                }}
                direction={"row"}
                alignItems={'center'}
                spacing={"0.5rem"}
                onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
            >
                {/* Close button at top-right */}
                {/* <IconButton
                    size="small"
                    onClick={closeHandler}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 5,
                        padding: "2px",
                        zIndex: 1,
                    }}
                >
                    <HighlightOffIcon sx={{ fontSize: "1rem", color: "black" }} />
                </IconButton> */}

                {/* Menu text */}
                {
                    isGroup ?
                        (
                            <>
                                <ExitToAppIcon /> <Typography>Leave Group</Typography>
                            </>
                        ) : (
                            <>
                                <DeleteIcon /><Typography>Delete Chat</Typography>
                            </>
                        )
                }
            </Stack>
        </Menu>
    );
};

export default DeleteChatMenu;
