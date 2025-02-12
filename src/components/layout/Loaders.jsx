import React from 'react'
import { Box, Grid, Skeleton, Stack } from '@mui/material'
import { BouncingSkeleton } from '../styles/StyledComponents'

const LayoutLoader = () => {
  return (
    <Grid container height={'calc(100vh - 4rem)'} spacing={'1rem'}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        height={'100%'}
      >
        <Skeleton variant="rectangular" height={'100vh'} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
        <Stack spacing={'1rem'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={'5rem'} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        height={'100%'}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Skeleton variant="rectangular" height={'100vh'} />
      </Grid>
    </Grid>
  )
}

const TypingLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: 'fit-content',
        backgroundColor: '#f0f0f0',
        padding: '0.3rem 0.6rem',
        borderRadius: '1rem',
        margin: '0.3rem 0',
      }}
    >
      <Stack direction="row" spacing={'0.2rem'}>
        <BouncingSkeleton variant="circular" delay="0s" />
        <BouncingSkeleton variant="circular" delay="0.2s" />
        <BouncingSkeleton variant="circular" delay="0.4s" />
      </Stack>
    </Box>
  )
}

export { TypingLoader, LayoutLoader }
