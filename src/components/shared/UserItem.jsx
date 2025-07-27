import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { transformImage } from '../../lib/features.js'

const UserItem = ({
    user,
    handler,
    handlerIsLoading,
    isAdded = false,
    styling = {}
}) => {
    const { name, _id, avatar } = user;

    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                sx={{ ...styling, width: "100%" }}
            >
                <Avatar src={transformImage(avatar.url || avatar)} />
                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                        fontFamily: "monospace",
                    }}
                >{name}</Typography>
                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark"
                        },
                    }} onClick={() => handler(_id)}
                    disabled={handlerIsLoading}>
                    {
                        isAdded ? (
                            <RemoveIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }} />
                        ) : (
                            <AddIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }} />
                        )
                    }
                </IconButton>
            </Stack>
        </ListItem >
    )
}

export default memo(UserItem)