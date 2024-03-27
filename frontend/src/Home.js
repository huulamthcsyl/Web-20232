import React from 'react'
import { Container, Col, Row, Form, Button, Image, Text } from 'react-bootstrap'
import image from './assets/icons/image.png'
import user from './assets/icons/user.png'

export default function Home() {

  const handleCreatePost = (e) => {
    e.preventDefault()
  }

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
          <Container className='border p-2'>
            <Form onSubmit={handleCreatePost}>
              <textarea class="form-control" placeholder="Bạn đang nghĩ gì" style={{height: "100px", border: 0}} />
              <Container className='p-2 d-flex justify-content-between'>
                <div>
                  <label htmlFor='file-upload' style={{cursor: 'pointer'}}>
                    <Image src={image} />
                  </label>
                  <input id='file-upload' type='file' style={{ display: 'none' }} accept='image/*, video/*'/>
                </div>
                <Button type='submit'>Đăng</Button>
              </Container>
            </Form>
          </Container>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}
