import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFreindsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroups = () => {

  const { isNewGroup } = useSelector(state => state.misc)
  const dispatch = useDispatch()

  const { isError, isLoading, error, data } = useAvailableFreindsQuery()

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const groupName = useInputValidation("")

  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [{
    isError,
    error
  }]

  useErrors(errors)
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]));
  }
  // On Submit
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2) return toast.error("Please select atleast 3 members");

    // Creating Group
    newGroup("Creating new group...", { name: groupName.value, members: selectedMembers })
    closeHandler();
  }


  const closeHandler = () => dispatch(setIsNewGroup(false))

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            isLoading ? (
              <Skeleton />
            ) : (
              data?.friends?.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)} />
              ))
            )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant='text' color='error' size='large' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroups
