import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from '../components/shared/UserItem';
import { Link } from "../components/styles/StyledComponent";
import { bgGradient, bgGradientHeader, matBlack } from '../constants/color';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMember } from '../redux/reducers/misc';
import { motion } from 'framer-motion';


const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const isAddMember = false

const Groups = () => {
  const dispatch = useDispatch()
  const { isAddMember } = useSelector(state => state.misc)

  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate()

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  //---RTK---
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")

  const [members, setMembers] = useState([])

  const errors = [{
    isError: myGroups.isError,
    error: myGroups.error
  },
  {
    isError: groupDetails.isError,
    error: groupDetails.error
  }]

  useErrors(errors)

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails?.data?.chat?.name)
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name)
      setMembers(groupDetails?.data?.chat?.members)
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([])
      setIsEdit(false);
    }
  }, [groupDetails.data])

  const navigateBack = () => { navigate("/") }
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }

  //Update group name
  const updateGroupName = () => {
    const trimmedName = groupNameUpdatedValue.trim();

    // If name is same or empty, skip API call and just exit edit mode
    if (!trimmedName || trimmedName === groupName) {
      setIsEdit(false);
      return;
    }

    updateGroup("Updating group name...", { chatId, name: groupNameUpdatedValue })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMember = () => dispatch(setIsAddMember(true))


  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId)
    closeConfirmDeleteHandler()
    navigate("/groups");
  }


  const removeMemberHandler = (userID) => {
    removeMember("Removing member...", { chatId, userID })
  }


  // Right side icons
  const IconBtns = <>
    <Tooltip title="My Groups">
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "0.5rem"
          }
        }}>
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Tooltip>
    {/* Back btn */}
    <Tooltip title="Back">
      <IconButton
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          bgcolor: matBlack,
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)"
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon sx={{ fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" } }} />
      </IconButton>
    </Tooltip>
  </>;

  // Group name
  const GroupName =
    <Stack
      direction={"row"}
      alignContent={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      marginTop={"2rem"}
    >
      {isEdit ? (<>
        <TextField
          value={groupNameUpdatedValue}
          onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
        />
        <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
          <DoneIcon />
        </IconButton>
      </>) : (
        <>
          <Typography
            fontSize={{ xs: "1.2rem", sm: "1.5rem", md: "2.5rem" }}
            fontWeight={"bold"} >
            {groupName}
          </Typography>
          <Tooltip title={"Edit Group Name"}>
            <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
              <EditIcon sx={{ fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" } }} />
            </IconButton>
          </Tooltip>
        </>)
      }
    </Stack>;

  // buttonGroup
  const buttonGroup = <Stack direction={{
    sm: "row",
    xs: "column-reverse",
  }}
    margin={"0.5rem 0"}
    spacing={"1rem"}
    p={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem"
    }}
  >
    <Button
      sx={{ fontSize: { xs: "0.5rem", sm: "0.5rem", md: "1rem" } }}
      color='error' startIcon={<DeleteIcon />}
      onClick={openConfirmDeleteHandler}>Delete Group</Button>
    <Button sx={{ fontSize: { xs: "0.5rem", sm: "0.5rem", md: "1rem" } }}
      variant='contained'
      startIcon={<AddIcon />}
      onClick={openAddMember}>Add Member</Button>
  </Stack>

  // Rendering off main component
  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={"100dvh"}>
      {/* Left side */}
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block"
          },
          overflow: "auto"
        }}
        sm={4}
      >
        <GroupList w='50vw' myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      {/* RightSide  */}
      <Grid item xs={12} sm={8} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "1rem 2rem"
      }}
      >
        {IconBtns}
        {
          chatId && groupDetails.data ? (
            <>
              {GroupName}
              <Typography
                margin={"1rem"}
                alignSelf={"flex-center"}
                variant='body1'
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.5rem" },
                  fontWeight: "600",
                }}
              >
                Members
              </Typography>

              <Stack
                maxWidth={"50rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem"
                }}
                spacing={"1rem"}
                height={{ xs: "46dvh", sm: "40dvh", md: "50dvh" }}
                overflow={"auto"}
              >
                {/* ----------members---------- */}
                {
                  isLoadingRemoveMember ? (
                    <CircularProgress />
                  ) : (
                    members.map((user) => (
                      <UserItem
                        user={user}
                        isAdded
                        key={user._id}
                        styling={{
                          boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                          padding: { xs: "0.5rem 1.5rem", sm: "0.5rem 1.5rem", md: "1rem 1.2rem" },
                          borderRadius: { xs: "0.5rem", sm: "0.5rem", md: "1rem" }
                        }}
                        handler={removeMemberHandler}
                      />
                    ))
                  )}
              </Stack>

              {buttonGroup}
            </>
          ) : (
            <Typography
              variant="h4"
              color="textSecondary"
              textAlign="center"
              sx={{
                marginTop: "2rem",
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }
              }}
            >
              No group selected
            </Typography>
          )

        }
      </Grid>

      {
        isAddMember && (<Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>)
      }

      {/* Confirm Delete Dialog */}
      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} />
          </Suspense>
        )}


      <Drawer sx={{
        display: {
          xs: "block",
          sm: "none"
        },
      }} open={isMobileMenuOpen} onClick={handleMobileClose}>
        <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  )
};


const GroupList = ({ w = "50vw", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        background: "linear-gradient(to right, #ffc3c3ff, #d45a6aff)",
        width: "100%",
        height: "100dvh"
      }}>
      {
        myGroups.length > 0 ? (
          // Here added index
          myGroups.map((group, index) => <GroupListItem index={index} group={group}
            key={group._id}
            chatId={chatId} />)
        ) : (
          <Typography textAlign={"center"} padding={"1rem"}>
            No Groups
          </Typography>
        )
      }
    </Stack>
  )
}

// Here added index
const GroupListItem = memo(({ group, chatId, index }) => {
  const { name, avatar, _id } = group;
  const isSelected = chatId === _id;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (isSelected) e.preventDefault();
      }}
      style={{
        textDecoration: "none",
        color: "inherit",
        width: "100%",
        display: "block",
        borderBottom: "0.5px solid #191616ff",
        padding: "0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-20%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing="1rem"
          sx={{
            width: "100%",
            margin: "0",
            padding: "1rem 1rem",
            backgroundColor: isSelected ? "#1a1a1a" : "transparent",
            color: isSelected ? "#fff" : "rgba(0, 0, 0, 0.85)",
            border: isSelected ? "1px solid #fff" : "1px solid transparent",
            transition: "background-color 0.3s, color 0.3s",
            cursor: "pointer",
          }}
        >
          <AvatarCard avatar={avatar} />
          <Typography
            fontWeight={isSelected ? "600" : "500"}
            noWrap
            sx={{ flex: 1 }}
            fontSize={{ xs: "0.8rem", sm: "0.8rem", md: "1.2rem" }}
          >
            {name}
          </Typography>
        </Stack>
      </motion.div>
    </Link>
  );
});





export default Groups
