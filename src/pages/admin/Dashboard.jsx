/* eslint-disable react/prop-types */
import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import moment from 'moment'
import {
  CurveButton,
  SearchField,
} from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { server } from '../../constants/config.js'
import { useErrors } from '../../hooks/hook.jsx'
import useFetch from 'react-fetch-hook'

export const useFetchData = (url) => {
  const { data, error, isLoading } = useFetch(url, {
    method: 'GET',
    credentials: 'include',
  })

  return { data, error, isLoading }
}

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    { cache: false }
  )

  const { messages } = data || {}

  useErrors([
    {
      isError: error,
      error: error,
    },
  ])

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{ xs: 'none', lg: 'block' }}
          color={'rgba(0,0,0,0.7)'}
          textAlign={'center'}
        >
          {moment().format('MMMM Do YYYY, h:mm a')}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  )
  console.log(messages)
  const Widgets = (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={'center'}
      margin={'2rem 0'}
    >
      <Widget
        title={'Users'}
        value={messages?.usersCount}
        Icon={<PersonIcon />}
      />
      <Widget
        title={'Chats'}
        value={messages?.totalChatsCount}
        Icon={<GroupIcon />}
      />
      <Widget
        title={'Messages'}
        value={messages?.messagesCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  )

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Container component={'main'}>
          {Appbar}

          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            spacing={'2rem'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            alignItems={{
              xs: 'center',
              lg: 'stretch',
            }}
            sx={{ gap: '2rem' }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '2rem 3.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '45rem',
              }}
            >
              <Typography margin={'2rem 0'} variant="h4">
                Last Messages
              </Typography>
              <LineChart value={messages?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                borderRadius: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '50%' },
                position: 'relative',
                maxWidth: '25rem',
              }}
            >
              <DoughnutChart
                labels={['Single', 'Group']}
                value={[
                  messages?.totalChatsCount - messages?.groupsCount || 0,
                  messages?.groupsCount || 0,
                ]}
              />

              <Stack
                position={'absolute'}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={'0.5rem'}
                width={'100%'}
                height={'100%'}
              >
                <GroupIcon /> <Typography>And </Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
      )}
    </AdminLayout>
  )
}

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: '2rem',
      margin: '2rem 0',
      borderRadius: '1.5rem',
      width: '20rem',
    }}
  >
    <Stack alignItems={'center'} spacing={'1rem'}>
      <Typography
        sx={{
          color: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          border: '5px solid rgba(0,0,0,0.7)',
          width: '5rem',
          height: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>
      <Stack>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)

export default Dashboard
