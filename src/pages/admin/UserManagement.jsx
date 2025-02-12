import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Skeleton } from '@mui/material'
import { transformImage } from '../../lib/features'
import { useFetchData } from './Dashboard'
import { server } from '../../constants/config'
import { useErrors } from '../../hooks/hook'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 200,
  },
]

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    { cache: false }
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
    if (data)
      setRows(
        data.transformedUsers.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar.url, 50),
        }))
      )
  }, [data])

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Table heading={'Users'} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  )
}

export default UserManagement
