import React from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'

export default function NavBar() {
  return (
    <Container className='p-1 border-bottom' fluid style={{ height: '10%' }}>
      <Row>
        <Col>
          <Form>
            <Form.Control className='rounded-pill' type="text" placeholder="Tìm kiếm" style={{width: '30%'}} />
          </Form>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <p>Button</p>
        </Col>
      </Row>
    </Container>
  )
}
