import { Avatar, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/hook';
import { transformImage } from '../../lib/features';
import { useAdminUsersQuery } from '../../redux/api/api';

// Defining Columns In DataTables
const columns = [{
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: "150"
}, {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: "150",
    renderCell: (params) => (<Avatar alt={params.row.name} src={params.row.avatar} />)
},
{
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: "200"
},
{
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: "200"
},
{
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: "150"
},
{
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: "150"
},
];


// Main
const UserManagement = () => {
    const [rows, setRows] = useState([])

    // Fetch users detail using RTK Query
    const { data, isLoading, isError, error } = useAdminUsersQuery();

    const errors = [{ isError, error }];
    useErrors(errors);


    useEffect(() => {
        if (data) {
            setRows(data?.users?.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar, 50) })));
        }
    }, [data])


    return (
        <AdminLayout>
            {isLoading ? <Skeleton height={"100vh"} /> : <Table rows={rows} columns={columns} heading={"All Users"} />}
        </AdminLayout>
    )
}

export default UserManagement;
