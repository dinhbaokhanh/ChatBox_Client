import {
  Box,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc.js'
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from '../../redux/api/api.js'
import { useAsyncMutation } from '../../hooks/hook.jsx'

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc)

  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  )

  const dispatch = useDispatch()

  const search = useInputValidation('')

  const [users, setUsers] = useState([])

  const addFriendHandler = async (id) => {
    await sendFriendRequest('Sending friend request ... ', { userId: id })
  }

  const searchCloseHandler = () => dispatch(setIsSearch(false))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e))
    }, 1000)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [search.value])

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={'2rem'} direction={'column'} width={'27rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
          <List>
            {users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
          </List>
        </Box>
      </Stack>
    </Dialog>
  )
}

export default Search
