import React, { useState } from 'react'
import { Container, Form, FormGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { register } from './services/API';
import { toast } from 'react-toastify';

export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp");
      return;
    }
    // Call API to register
    register(email, password)
      .then(res => {
        if (res.status === 200) {
          if (res.data.status) {
            toast.success(res.data.message)
          }
          else {
            toast.error(res.data.message);
          }
        }
        else {
          setErrorMessage("Đăng ký thất bại");
        }
      })
      .catch(err => {
        setErrorMessage("Đăng ký thất bại");
      })
  }

  return (
    <Container className='shadow border p-4 pb-0 rounded-2' style={{width: '500px', marginTop: '200px'}}>
      <Form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h1 className='align-self-center'>Đăng ký tài khoản</h1>
        <FormGroup className='mb-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' required/>
        </FormGroup>
        <FormGroup className='mb-2'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Mật khẩu' required/>
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder='Xác nhận mật khẩu' required/>
        </FormGroup>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        <Button className='align-self-center mb-2' type='submit' style={{width: '100px'}}>Đăng ký</Button>
        <p className='align-self-center'>Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link></p>
      </Form>
    </Container>
  )
}
