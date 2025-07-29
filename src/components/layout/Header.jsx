import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { lazy, Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bgGradient, bgGradient2, bgGradientHeader, blackWhiteGradient, matBlack, orange } from '../../constants/color'
import { server } from '../../constants/config'
import { userNotExists } from '../../redux/reducers/auth'
import { resetNotificationCount } from '../../redux/reducers/chat'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationDialog = lazy(() => import("../specific/Notifications"))
const NewGroupDialog = lazy(() => import("../specific/NewGroups"))

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc)
  const { notificationCount } = useSelector(state => state.chat)

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true))

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }

  //Handle Logout
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true
      })
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  }

  const openNotificaton = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount())
  }

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{
        background: bgGradientHeader,
        color: "#000",
        boxShadow: "none",
      }}>
        <AppBar
          position='static'
          elevation={0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            color: matBlack,
            height: { xs: "3.5rem", sm: "3.5rem", md: "4rem"},
          }}
        >
          <Toolbar>
            <Typography
              variant='h6'
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#fff"
              }}
            >
              ChatLoop
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton sx={{ color: "#fff" }} onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box >
              <IconBtn title={"Search"}
                icon={<SearchIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" } }} />}
                onClick={openSearch} />
              <IconBtn title={"New Group"}
                icon={<AddIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" } }} />}
                onClick={openNewGroup} />
              <IconBtn title={"Manage Group"}
                icon={<GroupIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" } }} />}
                onClick={navigateToGroup} />
              <IconBtn title={"Notifications"}
                icon={<NotificationsIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" } }} />}
                onClick={openNotificaton} value={notificationCount} />
              <IconBtn title={"Logout"}
                icon={<LogoutIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" } }} />}
                onClick={handleLogout} />
            </Box>
          </Toolbar>
        </AppBar>



      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  )
}

//Component
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' onClick={onClick}>
        {
          value ? (
            <Badge badgeContent={value} color='error'>
              {icon}
            </Badge>
          ) : (
            icon
          )
        }
      </IconButton>
    </Tooltip>
  )
}
export default Header
