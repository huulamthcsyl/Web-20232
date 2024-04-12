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
      <Container className='p-0 pt-2' fluid>
        <Row>
          <Col>
            <ProfileCard />
          </Col>
          <Col xs={7}>
            <Outlet />
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
