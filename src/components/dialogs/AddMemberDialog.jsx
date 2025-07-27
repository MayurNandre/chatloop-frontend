import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAddMemberInGroupMutation, useAvailableFreindsQuery } from '../../redux/api/api';
import { setIsAddMember } from '../../redux/reducers/misc';
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch()
  const { isAddMember } = useSelector(state => state.misc)

  // RTK
  const { isLoading, error, isError, data } = useAvailableFreindsQuery(chatId)
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddMemberInGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([])
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]));
  }

  const addMemberSubmitHandler = () => {
    addMembers("Adding members...", { members: selectedMembers, chatId })
    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  }

  useErrors([{
    isError,
    error
  }])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {
            isLoading ? (<Skeleton />) :
              data?.friends?.length > 0 ? (data?.friends?.map((user) => (
                <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
              ))
              ) : (
                <Typography textAlign={"center"}>No Friends</Typography>
              )
          }
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Button onClick={closeHandler} color='error'>Cancel</Button>
          <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMembers}>Submit Changes</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog

