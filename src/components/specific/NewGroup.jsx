/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {
  const dispatch = useDispatch()
  const { isNewGroup } = useSelector((state) => state.misc)

  const { isError, isLoading, error, data } = useAvailableFriendsQuery()

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const groupName = useInputValidation('')
  const [open, setOpen] = useState(true)

  const [selectedMembers, setSelectedMembers] = useState([])

  console.log(selectedMembers.length)

  const errors = [
    {
      isError,
      error,
    },
  ]
  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    )
  }

  const submitHandler = () => {
    if (!groupName.value) return toast.error('Group name is required')
    if (selectedMembers.length < 2)
      return toast.error('A group must have at least 3 members')

    newGroup('Creating New Group...', {
      name: groupName.value,
      members: selectedMembers,
    })
    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} maxWidth={'25rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">
          Create New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
