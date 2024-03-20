import React from 'react'
import { Container, Form, FormGroup, Button } from 'react-bootstrap'

export default function Login() {
  return (
    <Container className='border p-4 pb-0 rounded-2' style={{width: '500px', marginTop: '200px'}}>
      <Form className='d-flex flex-column'>
        <h1 className='align-self-center'>Đăng nhập</h1>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder='Email' />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder='Mật khẩu' />
        </FormGroup>
        <Button className='align-self-center mb-2' type='submit' style={{width: '150px'}}>Đăng nhập</Button>
        <p className='align-self-center'>Chưa có tài khoản? <a href='/sign-up'>Đăng ký</a></p>
      </Form>
    </Container>
  )
}
