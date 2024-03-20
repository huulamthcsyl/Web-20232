import React from 'react'
import { Container, Form, FormGroup, Button } from 'react-bootstrap'

export default function SignUp() {
  return (
    <Container className='border p-4 pb-0 rounded-2' style={{width: '500px', marginTop: '200px'}}>
      <Form className='d-flex flex-column'>
        <h1 className='align-self-center'>Đăng ký tài khoản</h1>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder='Email' />
        </FormGroup>
        <FormGroup>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder='Mật khẩu' />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control type="password" placeholder='Xác nhận mật khẩu' />
        </FormGroup>
        <Button className='align-self-center mb-2' type='submit' style={{width: '100px'}}>Đăng ký</Button>
        <p className='align-self-center'>Bạn đã có tài khoản? <a href='/login'>Đăng nhập</a></p>
      </Form>
    </Container>
  )
}
