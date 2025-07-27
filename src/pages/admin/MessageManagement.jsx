import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import RenderAttachment from '../../components/shared/RenderAttachment';
import Table from '../../components/shared/Table';
import { matBlack } from '../../constants/color';
import { useErrors } from '../../hooks/hook';
import { fileFormat, transformImage } from '../../lib/features';
import { useAdminMessagesQuery } from '../../redux/api/api';
// Defining Columns In DataTables
const columns = [{
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: "150"
}, {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: "200",
    renderCell: (params) => {

        const { attachments } = params.row
        return attachments?.length > 0 ?
            attachments.map((i) => {
                const url = i.url;
                const file = fileFormat(url)
                return (
                    <Box>
                        <a
                            href={url}
                            download
                            target="_blank"
                            style={{
                                color: "black"
                            }}
                        >
                            {RenderAttachment(file, url)}
                        </a>
                    </Box >
                )
            }) :
            "No Attachements"
    }
},
{
    field: "content",
    headerName: "Contents",
    headerClassName: "table-header",
    width: "400"
},
{
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: "220",
    renderCell: (params) => (<Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
    </Stack>)
},
{
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: "220"
},
{
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: "100",
    renderCell: (params) => (
        <Stack alignItems={"center"} color={params.row.groupChat === false ? "darkgray" : matBlack}>
            {params.row.groupChat === false ? "No" : "Yes"}
        </Stack>
    )
}, {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: "250"
}
];

// Message Management Component
const MessageManagement = () => {
    const [rows, setRows] = useState([])

    // Fetch messages detail using RTK Query
    const { data, isLoading, isError, error } = useAdminMessagesQuery();
    const errors = [{ isError, error }];

    console.log("Messages Data", data)
    useEffect(() => {
        if (data) {
            setRows(data?.messages.map((i) => (
                {
                    ...i,
                    id: i._id,
                    sender: {
                        name: i.sender.name,
                        avatar: transformImage(i.sender.avatar.url, 50)
                    },
                    createdAt: moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a")
                })))
        }
    }, [data])

    useErrors(errors);

    return (
        <AdminLayout>
            {isLoading ? <Skeleton height={"100vh"} /> : <Table columns={columns} rows={rows} heading={"All Messages"} rowHeight={180} />}
        </AdminLayout>
    )
}

export default MessageManagement




