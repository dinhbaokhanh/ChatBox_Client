/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: '0', textDecoration: 'none' }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: sameSender ? '#e0e0e0' : 'unset',
          color: sameSender ? '#000' : 'unset',
          position: 'relative',
          borderRadius: '12px',
          transition: 'background 0.3s ease-in-out',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#f5f5f5')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = sameSender
            ? '#e0e0e0'
            : 'unset')
        }
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <AvatarCard avatar={avatar} />

          {isOnline && (
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#31A24C',
                border: '2px solid white',
                position: 'absolute',
                bottom: '0px',
                left: '50px',
                transform: 'translate(-50%, 50%)',
                boxShadow: '0 0 4px rgba(49, 162, 76, 0.7)',
              }}
            />
          )}
        </div>

        <Stack>
          <Typography fontWeight="bold">{name}</Typography>
        </Stack>

        {newMessageAlert && newMessageAlert.count > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: '#FF3B30',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              minWidth: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              padding: '0 6px',
              boxShadow: '0 2px 6px rgba(255, 59, 48, 0.6)',
            }}
          >
            {newMessageAlert.count > 99 ? '99+' : newMessageAlert.count}
          </Box>
        )}
      </div>
    </Link>
  )
}

export default memo(ChatItem)
