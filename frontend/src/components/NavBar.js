import React from 'react'
import { Container, Form, Row, Col, Image, NavDropdown } from 'react-bootstrap'
import notification from '../assets/icons/notification.png'
import messenger from '../assets/icons/messenger.png'
import friends from '../assets/icons/friends.png'
import user from '../assets/icons/user.png'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId')
    navigate('/login')
  }

  return (
    <Container className='p-2 border-bottom' fluid style={{ height: '10%' }}>
      <Row>
        <Col>
          <Form>
            <Form.Control className='rounded-pill' type="text" placeholder="Tìm kiếm" style={{width: '30%', height: '50px'}} />
          </Form>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <NavDropdown title={<Image src={user} className='border p-1 ms-4' roundedCircle/>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
          <Image className='border p-1 ms-4' src={notification} roundedCircle/>
          <Image className='border p-1 ms-4' src={messenger} roundedCircle/>
          <Image className='border p-1 ms-4' src={friends} roundedCircle/>
        </Col>
      </Row>
    </Container>
  )
}
