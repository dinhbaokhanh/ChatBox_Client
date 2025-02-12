/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Avatar, Stack, Typography, ListItem, Button } from '@mui/material'
import { orange } from '../../constants/color'

const GroupInfo = ({ group }) => {
  const [showAll, setShowAll] = useState(false)

  console.log(group)

  const sortedMembers = group?.members
    ? [
        ...group.members.filter((member) => member._id === group.creator), // Creator lên đầu
        ...group.members.filter((member) => member._id !== group.creator), // Các thành viên còn lại
      ]
    : []

  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Stack
        width={200}
        height={200}
        position="relative"
        borderRadius="50%"
        bgcolor="rgba(255, 255, 255, 0.1)"
        border="5px solid white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {group?.members?.slice(0, 4).map((member, index) => (
          <Avatar
            key={member._id}
            src={member.avatar?.url}
            alt={member.name}
            sx={{
              width: 90,
              height: 90,
              position: 'absolute',
              transform: `translate(${index % 2 === 0 ? '-30%' : '30%'}, ${
                index < 2 ? '-30%' : '30%'
              })`,
              border: '2px solid white',
            }}
          />
        ))}
      </Stack>

      <ProfileCard heading={'Group Name'} text={group?.name} />
      <ProfileCard
        heading={'Members'}
        text={`${group?.members?.length} members`}
      />
      <Stack spacing={1} width={'100%'} maxWidth={'400px'}>
        {sortedMembers
          ?.slice(0, showAll ? sortedMembers.length : 2)
          .map((member) => (
            <ListItem
              key={member._id}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  src={member.avatar?.url}
                  alt={member.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography>{member.name}</Typography>
              </Stack>
              {member._id === group.creator && (
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: orange,
                    color: 'black',
                    padding: '2px 6px',
                    borderRadius: '5px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  Creator
                </Typography>
              )}
            </ListItem>
          ))}

        {group?.members?.length > 2 && (
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="contained"
            color="primary"
          >
            {showAll ? 'Show less' : 'See more members'}
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

const ProfileCard = ({ text, heading }) => (
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

export default GroupInfo
