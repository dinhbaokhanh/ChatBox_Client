/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
} from '@mui/icons-material'
import { transformImage } from '../../lib/features.js'

const Profile = ({ user }) => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '5px solid white',
        }}
      />
      <ProfileCard heading={'Description'} text={user?.description} />
      <ProfileCard
        heading={'About'}
        text={user?.username?.toUpperCase()}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={'Name'} text={user?.name} Icon={<FaceIcon />} />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={'row'}
    alignItems={'center'}
    spacing={'1rem'}
    color={'white'}
    textAlign={'left'}
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '1rem',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    }}
  >
    {Icon && (
      <Stack
        sx={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Icon}
      </Stack>
    )}

    <Stack spacing={'0.2rem'}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        {text}
      </Typography>
      <Typography color={'gray'} variant="caption" sx={{ fontSize: '0.85rem' }}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
)

export default Profile
