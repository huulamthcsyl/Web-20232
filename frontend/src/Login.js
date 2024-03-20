import React, { useState } from 'react'
import { Container, Form, FormGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Container className='shadow border p-4 pb-0 rounded-2' style={{width: '500px', marginTop: '200px'}}>
      <Form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h1 className='align-self-center'>Đăng nhập</h1>
        <FormGroup className='mb-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder='Mật khẩu' required value={password} onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button className='align-self-center mb-2' type='submit' style={{width: '150px'}}>Đăng nhập</Button>
        <p className='align-self-center'>Chưa có tài khoản? <Link to='/sign-up'>Đăng ký</Link></p>
      </Form>
    </Container>
  )
}
