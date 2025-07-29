import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matBlack } from '../../constants/color'
import { setIsMobile } from '../../redux/reducers/misc'
import { Link } from '../styles/StyledComponent'
import AvatarCard from './AvatarCard'

const Chatitem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {

    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);

    const handleChatClick = useCallback(() => {
        if (isMobile) dispatch(setIsMobile(false));
    }, [isMobile, dispatch]);


    // To disable inspect tab on chat items
    const ref = useRef();

    useEffect(() => {
        const handleContextMenu = (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                e.preventDefault();
            }
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <Link
            sx={{ padding: "0" }}
            to={`/chat/${_id}`}
            onClick={handleChatClick}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        >

            <motion.div
                initial={{ opacity: 0, y: "-%100" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                    display: "flex",
                    gap: groupChat ? "1rem" : "0rem",
                    alignItems: "center",
                    padding: "1rem",
                    background: sameSender ? matBlack : "unset",
                    color: sameSender ? "white" : "unset",
                    fontWeight: sameSender ? "800" : "unset",
                    position: "relative",
                }}
                ref={ref}
            >

                <AvatarCard avatar={avatar} />
                <Stack >
                    <Typography sx={{ fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem" } }}>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography
                                sx={{ fontSize: { xs: "0.5rem", sm: "0.5rem", md: "0.8rem" } }}>
                                {newMessageAlert.count} New Message
                            </Typography>
                        )
                    }
                </Stack>
                {
                    isOnline && <Box sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)"
                    }} />
                }
            </motion.div>
        </Link>
    )
}

export default memo(Chatitem)
