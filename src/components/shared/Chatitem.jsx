import { Box, Stack, Typography } from '@mui/material'
import { memo, useEffect, useRef } from 'react'
import { Link } from '../styles/StyledComponent'
import AvatarCard from './AvatarCard'
import { motion } from 'framer-motion'
import { blackWhiteGradient, matBlack } from '../../constants/color'

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

    // To disable inspect tab -- Remove After Testing
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
    // To disable inspect tab -- Remove After Testing End

    return (
        <Link
            sx={{
                padding: "0"
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>

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
                    <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography
                                sx={{ fontSize: { xs: "0.3rem", sm: "0.3rem", md: "0.8rem" } }}>
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
