/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { gray } from '../constants/color'

const Home = () => {
  return (
    <Box bgcolor={gray} height={'100%'}>
      <Typography p={'2rem'} variant="h5" textAlign={'center'}>
        Let's begin a conversation
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home)
