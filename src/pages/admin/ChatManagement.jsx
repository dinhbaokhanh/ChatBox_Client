import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Skeleton, Stack } from '@mui/material'
import { transformImage } from '../../lib/features'
import AvatarCard from '../../components/shared/AvatarCard'
import { useFetchData } from './Dashboard'
import { useErrors } from '../../hooks/hook'
import { server } from '../../constants/config'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'groupChat',
    headerName: 'Group',
    headerClassName: 'table-header',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    headerClassName: 'table-header',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'members',
    headerName: 'Members',
    headerClassName: 'table-header',
    width: 400,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'creator',
    headerName: 'Created By',
    headerClassName: 'table-header',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          alt={params.row.creator.name}
          src={params.row.creator.avatar}
          sx={{ width: 40, height: 40, borderRadius: '50%' }}
        />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
]

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    { cache: false }
  )

  useErrors([
    {
      isError: error,
      error: error,
    },
  ])

  console.log(data?.transformedChat)

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (data)
      setRows(
        data.transformedChat.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => transformImage(i.url, 50)),
          members: i.members.map((i) => transformImage(i.avatar.url, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar.url, 50),
          },
          groupChat: i.groupChat ? 'Group Chat' : 'Private',
        }))
      )
  }, [data])

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Table
          heading={'Chats History'}
          columns={columns}
          rows={rows}
          rowHeight={80}
          sx={{
            '& .table-header': {
              backgroundColor: '#3f51b5',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #ddd',
            },
          }}
        />
      )}
    </AdminLayout>
  )
}

export default ChatManagement
