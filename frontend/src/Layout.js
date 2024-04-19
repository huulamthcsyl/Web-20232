import React from 'react'
import { Row, Col } from 'react-bootstrap'
import user from './assets/icons/user.png'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import ProfileCard from './components/ProfileCard'
import { Container } from 'react-bootstrap'

export default function Layout() {
  return (
    <Container fluid className='p-0'>
      <NavBar />
      <Container className='p-0 pt-2 position-relative' fluid>
        <Container className='p-0 position-fixed' style={{ width: '20%', top:'75px', left: '0px'  }}>
          <ProfileCard />
        </Container>
        <Container className='p-0' style={{width: '60%'}}>
          <Outlet />
        </Container>
        <Container className='p-0 position-fixed' style={{ width: '20%', top:'75px', right: '0px' }}>
          
        </Container>
      </Container>
    </Container>
  )
}
