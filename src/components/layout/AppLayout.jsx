/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import Chatlist from '../specific/ChatList'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useChatDetailsQuery, useMyChatsQuery } from '../../redux/api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from '../../redux/reducers/misc.js'
import { useErrors, useSocketEvents } from '../../hooks/hook.jsx'
import { getSocket } from '../../socket.jsx'
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from '../../constants/events.js'
import {
  increaseNotification,
  setNewMessagesAlert,
} from '../../redux/reducers/chat.js'
import { getOrSaveFromStorage } from '../../lib/features.js'
import GroupInfo from '../specific/GroupInfo.jsx'
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const chatId = params.chatId

    const deleteMenuAnchor = useRef(null)

    const socket = getSocket()

    const [onlineUsers, setOnlineUsers] = useState([])

    const { isMobile } = useSelector((state) => state.misc)
    const { user } = useSelector((state) => state.auth)
    const { newMessagesAlert } = useSelector((state) => state.chat)

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery('')

    const { data: chatDetails, isLoading: isChatLoading } = useChatDetailsQuery(
      {
        chatId,
        populate: true,
      },
      { skip: !chatId }
    )

    const chatUser = chatDetails?.chat?.groupChat
      ? chatDetails.chat
      : chatDetails?.chat?.members?.find((member) => member._id !== user._id) ||
        user

    useErrors([{ isError, error }])

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({ chatId, groupChat }))
      deleteMenuAnchor.current = e.currentTarget
    }

    const handleMobileClose = () => dispatch(setIsMobile(false))

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return
        dispatch(setNewMessagesAlert(data))
      },
      [chatId]
    )

    const newRequestHandler = useCallback(() => {
      dispatch(increaseNotification())
    }, [dispatch])

    const refetchListener = useCallback(() => {
      refetch()
      navigate('/')
    }, [refetch, navigate])

    const onlineUsersListener = useCallback(
      (data) => {
        console.log(data)
        setOnlineUsers(data)
      },
      [data]
    )

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    }

    useSocketEvents(socket, eventHandlers)

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <Chatlist
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={'calc(100vh - 4rem)'}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={'100%'}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={'100%'}
            sx={{
              display: { xs: 'none', sm: 'block' },
              padding: '2rem',
              bgcolor: 'rgba(0, 0, 0, 0.75)',
            }}
          >
            {chatDetails?.chat?.groupChat ? (
              <GroupInfo group={chatDetails.chat} />
            ) : (
              <div style={{ color: 'white', fontSize: '1.5rem' }}>
                Profile Component
              </div>
            )}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AppLayout
