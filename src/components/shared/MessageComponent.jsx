import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color';
import moment from 'moment';
import { fileFormat, transformImage } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { motion } from 'framer-motion'

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id
    const timeAgo = moment(createdAt).fromNow(TimeRanges)
    return (
        <motion.div
            initial={sameSender ? { opacity: 0, x: "100%" } : { opacity: 0, x: "-100%" }}
            whileInView={sameSender ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}

            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                padding: "0.3rem 0.5rem",
                width: "fit-content"
            }}>
            {/* showing messages */}
            {!sameSender &&
                <Typography color={lightBlue}
                    fontSize={{ xs: "0.6rem", sm: "0.6rem", md: "0.8rem" }}
                    fontWeight={"600"}
                    variant='caption'
                >
                    {sender.name}
                </Typography>}
            {content &&
                <Typography fontSize={{ xs: "0.8rem", sm: "0.8rem", md: "1rem" }}>
                    {content}
                </Typography>}
            {/* Attachment */}
            {
                attachments.length > 0 && attachments.map((attachment, index) => {
                    const url = transformImage(attachment.url, 500)
                    const file = fileFormat(url)
                    return <Box key={index}>
                        <a
                            href={url}
                            target='_blank'
                            download
                            style={{
                                color: "black"
                            }}
                        >
                            {RenderAttachment(file, url)}
                        </a>
                    </Box>
                })
            }
            <Typography fontSize={{ xs: "0.4rem", sm: "0.4rem", md: "0.6rem" }}
                variant='caption'
                color={"text.secondary"}>
                {timeAgo} ago
            </Typography>
        </motion.div>
    )
}

export default memo(MessageComponent)
