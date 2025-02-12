/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color'
import moment from 'moment'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'
import { motion } from 'framer-motion'

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message

  const sameSender = sender?._id === user?._id

  const timeAgo = moment(createdAt).fromNow()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: sameSender ? lightBlue : '#F0F0F0',
        color: sameSender ? 'white' : 'black',
        borderRadius: sameSender ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
        padding: '0.6rem 1rem',
        width: 'fit-content',
        maxWidth: '60%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        wordBreak: 'break-word',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
      }}
    >
      {!sameSender && (
        <Typography
          sx={{ color: lightBlue, fontWeight: 600 }}
          variant="caption"
        >
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url
          const file = fileFormat(url)

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: 'black',
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          )
        })}

      <Typography variant="caption" color={'text.secondary'}>
        {timeAgo}
      </Typography>
    </motion.div>
  )
}

export default memo(MessageComponent)
