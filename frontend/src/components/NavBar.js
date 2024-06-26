import React, { useState } from 'react'
import { Container, Form, Row, Col, Image, NavDropdown } from 'react-bootstrap'
import notification from '../assets/icons/notification.png'
import messenger from '../assets/icons/messenger.png'
import friends from '../assets/icons/friends.png'
import user from '../assets/icons/user.png'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/icons/logo.png'
import { socket } from '../socket'
import SearchBar from './SearchBar'

/**
 * Represents the navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function NavBar({ doesNotificationContainerOpen, setDoesNotificationContainerOpen, doseMessageListOpen, setDoseMessageListOpen}) {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId');
    // Disconnect socket.io connection
    socket.disconnect();
    navigate('/login');
  }

  return (
    <Container className='p-2 border-bottom sticky-top' fluid style={{ height: '10%', backgroundColor: '#fff' }}>
      <Row>
        <Col>
          <Container className='p-0 d-flex'>
            <Link className='me-2 mt-1' to={'/'}>
              <Image src={logo} style={{ width: '40px' }} />
            </Link>
            {/* <Form>
              <Form.Control className='rounded-pill' type="text" placeholder="Tìm kiếm" style={{ height: '50px' }} />
            </Form> */}
            <SearchBar/>
          </Container>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <NavDropdown title={<Image src={user} className='border p-1 ms-4' roundedCircle />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
          <Image style={{cursor: 'pointer'}} className='border p-1 ms-4' src={notification} roundedCircle 
            onClick={() => {
              setDoesNotificationContainerOpen(!doesNotificationContainerOpen)
              setDoseMessageListOpen(false) 
            }}
          />
          <Image style={{cursor: 'pointer'}} className='border p-1 ms-4' src={messenger} roundedCircle 
            onClick={() => {
              setDoseMessageListOpen(!doseMessageListOpen)
              setDoesNotificationContainerOpen(false)}}
          />
          <Link to={`/friendRequest`}>
            <Image className='border p-1 ms-4' src={friends} roundedCircle />
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
