import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkComponent, useLocation, useNavigate } from "react-router-dom";
import { grayColor, matBlack, orange } from '../../constants/color';
import { adminLogout } from '../../redux/thunks/admin';

const Link = styled(LinkComponent)`
text-decoration : none;
border-radius:1rem 2rem;
padding:1rem 2rem;
color:black;
&:hover{
color:rgba(0,0,0,0.54);
}
`

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />
    },
]

// SideBar Component
const SideBar = ({ w = "100%", }) => {
    const location = useLocation()

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(adminLogout());
    }


    return (
        <Stack width={w} direction={"column"} spacing={"3rem"} p={"3rem"}>
            <Typography color={"#1C1C1C"} textAlign={"center"} variant='h5' fontWeight={"bold"} fontFamily={"monospace"}>ChatApp</Typography>
            <Stack spacing={"1rem"}>
                {
                    adminTabs.map((tab) => (
                        <Link key={tab.path} to={tab.path}
                            sx={location.pathname === tab.path && {
                                bgcolor: matBlack,
                                color: "white",
                                ":hover": { color: "white" }
                            }}
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography fontFamily={"monospace"}>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))}
                {/* Logout */}
                <Link onClick={logoutHandler}>
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon />
                        <Typography fontFamily={"monospace"}>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}


// AdminLayout Component

const AdminLayout = ({ children }) => {
    const { isAdmin } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleMobile = () => {
        setIsMobile(!isMobile)
    }

    const handleClose = () => {
        setIsMobile(false)
    }

    return (
        <Grid container minHeight={"100dvh"} >
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    right: "1rem",
                    top: "1rem",
                }}>
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>
            {/* SideBar BigScreen */}
            <Grid
                item
                md={3}
                lg={3}
                sx={{ display: { xs: "none", md: "block" } }}
            >
                <SideBar />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                lg={9}
                sx={{ bgcolor: grayColor }}
            >
                {/* all children Render Here */}
                {children}
            </Grid>
            {/* SideBar Mobile */}
            <Drawer open={isMobile} onClose={handleClose}>
                <SideBar w={"50vw"} />
            </Drawer>

        </Grid>
    )
}

export default AdminLayout
