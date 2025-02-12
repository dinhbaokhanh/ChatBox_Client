/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState, memo } from 'react'
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from '../../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc.js'
import toast from 'react-hot-toast'

const Notification = () => {
  const { isNotification } = useSelector((state) => state.misc)

  const dispatch = useDispatch()

  const { isLoading, data, error, isError } = useGetNotificationsQuery()

  const [acceptFriendRequest] = useAsyncMutation(useAcceptFriendRequestMutation)

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))
    await acceptFriendRequest('Accepting...', { requestId: _id, accept })
  }

  const closeHandler = () => dispatch(setIsNotification(false))

  useErrors([{ error, isError }])

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack
        p={{ xs: '1rem', sm: '2rem' }}
        maxWidth={'30rem'}
        sx={{ overflowWrap: 'break-word' }}
      >
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.requests.length > 0 ? (
              data?.requests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={'center'}>No Notification</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender

  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar?.url} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            width: '100%',
          }}
        >
          <Typography component="span" fontWeight="bold">
            {name}
          </Typography>{' '}
          sent you a friend request
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})

export default Notification
