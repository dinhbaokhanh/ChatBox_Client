/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { bgGradient, brown } from '../constants/color.js'
import {
  Add as AddIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import UserItem from '../components/shared/UserItem'
import {
  useChatDetailsQuery,
  useDeleteGroupMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from '../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { LayoutLoader } from '../components/layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc.js'

const ConfirmDeleteDialog = lazy(
  () => import('../components/dialogs/ConfirmDeleteDialog')
)
const AddMemberDialog = lazy(
  () => import('../components/dialogs/AddMemberDialog')
)

const Group = () => {
  const chatId = useSearchParams()[0].get('group')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const myGroups = useMyGroupsQuery('')
  const { isAddMember } = useSelector((state) => state.misc)

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    {
      skip: !chatId,
    }
  )

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  )

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  )

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteGroupMutation
  )

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const [groupName, setGroupName] = useState('')
  console.log(groupName)

  const [groupNameUpdated, setGroupNameUpdated] = useState('')

  const [members, setMembers] = useState([])

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ]

  useErrors(errors)

  useEffect(() => {
    const groupData = groupDetails.data
    console.log(groupData?.chat.name)

    if (groupDetails.data?.chat?.name) {
      setGroupName(groupData?.chat.name)
      setGroupNameUpdated(groupData?.chat.name)
      setMembers(groupData?.chat.members)
    }

    return () => {
      setGroupName('')
      setGroupNameUpdated('')
      setMembers([])
    }
  }, [groupDetails.data?.chat?.name])

  const navigateBack = () => {
    navigate('/')
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }

  const updateGroupName = () => {
    setIsEdit(false)
    updateGroup('Updating Group Name..', {
      chatId,
      name: groupNameUpdated,
    })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const deleteHandler = () => {
    deleteGroup('Deleting Group...', chatId)
    closeConfirmDeleteHandler()
    navigate('/')
  }

  const removeMemberHandler = (userId) => {
    removeMember('Removing Member...', { chatId, userId })
  }

  useEffect(() => {
    if (chatId && !groupDetails.data) {
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdated(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName('')
      setGroupNameUpdated('')
      setIsEdit(false)
    }
  }, [chatId, groupDetails.data])

  const sortedMembers = groupDetails?.data?.chat?.members
    ? [
        ...groupDetails.data.chat.members.filter(
          (member) => member._id === groupDetails.data.chat.creator
        ),
        ...groupDetails.data.chat.members.filter(
          (member) => member._id !== groupDetails.data.chat.creator
        ),
      ]
    : []

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          },
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: brown,
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )

  const GroupName = (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={'1rem'}
      padding={'3rem'}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdated}
            onChange={(e) => setGroupNameUpdated(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  )

  const ButtonGroup = (
    <Stack
      direction={{
        sm: 'row',
        xs: 'column-reverse',
      }}
      spacing={'1rem'}
      p={{
        sm: '1rem',
        xs: '0',
        md: '1rem 4rem',
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  )

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={'2rem'}
              alignSelf={'flex-start'}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem 4rem',
              }}
              spacing={'0.5rem'}
              height={'50vh'}
              overflow={'auto'}
            >
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                sortedMembers.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={'50vw'}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  )
}

const GroupsList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgGradient,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={'center'} padding="1rem">
          No Group
        </Typography>
      )}
    </Stack>
  )
}

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault()
      }}
    >
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
})

export default Group
