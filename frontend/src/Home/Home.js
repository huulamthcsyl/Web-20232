import React from 'react'
import { Container, Col, Row, Form, Button, Image, Text } from 'react-bootstrap'
import user from '../assets/icons/user.png'
import NewFeeds from './NewFeeds'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()

  return (
    <Container className='p-0 pt-3' fluid>
      <Row>
        <Col>
          <Link className='d-flex border p-1 rounded-2' to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
            <Image className='border p-1' src={user} roundedCircle/>
            <h5 className='align-self-center m-0 ms-2'>Nguyễn Văn A</h5>
          </Link>
        </Col>
        <Col xs={7}>
          <NewFeeds />
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}
