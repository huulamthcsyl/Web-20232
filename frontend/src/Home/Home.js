import React from 'react'
import { Container, Col, Row, Form, Button, Image, Text } from 'react-bootstrap'
import user from '../assets/icons/user.png'
import NewFeeds from './NewFeeds'

export default function Home() {


  return (
    <Container className='p-0 pt-3' fluid>
      <Row>
        <Col>
          <Container className='d-flex'>
            <Image className='border p-1' src={user} roundedCircle/>
            <h5 className='align-self-center m-0 ms-2'>Nguyễn Văn A</h5>
          </Container>
        </Col>
        <Col>
          <NewFeeds />
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}
