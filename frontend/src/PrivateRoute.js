import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from './Layout'

export default function PrivateRoute() {
  return (
    localStorage.getItem('userId') ? (
      <Layout />
    ) : (
      <Navigate to='/login' replace={true} />
    )
  )
}
