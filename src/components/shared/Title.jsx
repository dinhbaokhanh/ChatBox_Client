/* eslint-disable react/prop-types */
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ title = 'Chat Box', description = 'Chat Box for me' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title
