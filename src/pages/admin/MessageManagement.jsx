import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Box, Stack, Typography, Chip, Skeleton } from '@mui/material'
import { fileFormat } from '../../lib/features'
import RenderAttachment from '../../components/shared/RenderAttachment'
import { useFetchData } from './Dashboard'
import { useErrors } from '../../hooks/hook'
import { server } from '../../constants/config'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 250,
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 220,
    renderCell: (params) => {
      const { attachments } = params.row
      return attachments?.length > 0 ? (
        <Stack spacing={1}>
          {attachments.map((i) => {
            const url = i.url
            const file = fileFormat(url)
            return (
              <Box key={i._id} sx={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={url}
                  download
                  style={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 'bold',
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            )
          })}
        </Stack>
      ) : (
        <Chip label="No Attachments" variant="outlined" color="warning" />
      )
    },
  },
  {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 400,
  },
  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 220,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt={params.row.sender.name}
          src={params.row.sender.avatar}
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.row.sender.name}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.row.groupChat === 'Yes' ? 'Yes' : 'No'}
        color={params.row.groupChat === 'Yes' ? 'success' : 'default'}
      />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 250,
  },
]

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    {
      cache: false,
    }
  )

  useErrors([
    {
      isError: error,
      error: error,
    },
  ])

  console.log(data)

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (data && data.messages) {
      setRows(
        data.messages.map((i) => ({
          id: i._id,
          content: i.content || 'No content',
          attachments: i.attachments || [],
          createdAt: new Date(i.createdAt).toLocaleString(),
          chat: i.chat || 'Unknown',
          groupChat: i.groupChat ? 'Yes' : 'No',
          sender: {
            name: i.sender?.name || 'Unknown',
            avatar: i.sender?.avatar?.url || '/default-avatar.png',
          },
        }))
      )
    }
  }, [data])

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 3,
            padding: 3,
            boxShadow: 2,
          }}
        >
          <Table
            heading={'All Messages'}
            columns={columns}
            rows={rows}
            rowHeight={70}
          />
        </Box>
      )}
    </AdminLayout>
  )
}

export default MessageManagement
