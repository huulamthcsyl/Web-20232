import React from 'react'
import { Card, Col, Container, Image } from 'react-bootstrap'
import heart from '../assets/icons/heart.png'
import comment from '../assets/icons/comment.png'
import share from '../assets/icons/share.png'

export default function Post({ post }) {
  return (
    <Card className='mb-2'>
      <Card.Header>
        <Container className='d-flex justify-content-between'>
          <Col className='d-flex'>
            <img src='https://via.placeholder.com/50' alt='avatar' style={{ borderRadius: '50%' }} />
            <h5 className='align-self-center ms-2'>Nguyễn Văn A</h5>
          </Col>
          <Col className='d-flex'>
            <p className='align-self-center m-0'>1 giờ trước</p>
          </Col>
        </Container>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {post.body}
        </Card.Text>
        <Container className='d-flex justify-content-start mb-2 p-0'>
          {post.image && post.image.map((image, index) => (
            <Image key={index} src={image} style={{ maxWidth: '200px', maxHeight: '400px' }} className='me-3 border' />
          ))}
        </Container>
        {post.video && <video className='border' src={post.video} controls width="100%" />}
      </Card.Body>
      <Card.Footer>
        <Container className='d-flex justify-content-between'>
          <Col className='d-flex'>
            <Image className='me-2' src={heart} />
            <p className='align-self-center m-0'>10 lượt thích</p>
          </Col>
          <Col className='d-flex'>
          <Image className='me-2' src={comment} />
            <p className='align-self-center m-0'>5 bình luận</p>
          </Col>
          <Col className='d-flex'>
          <Image className='me-2' src={share} />
            <p className='align-self-center m-0'>Chia sẻ</p>
          </Col>
        </Container>
      </Card.Footer>
    </Card>
  )
}
