import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Container fluid className='p-0'>
        <NavBar />
        <Outlet />
    </Container>
  )
}
