import React from 'react'
import { Card, Col, Container, Image } from 'react-bootstrap'
import heart from '../assets/icons/heart.png'
import comment from '../assets/icons/comment.png'
import share from '../assets/icons/share.png'

export default function Post() {
  return (
    <Card>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nisl
          tincidunt aliquam. Sed nec odio nec nunc ultricies tincidunt. Sed nec odio nec nunc
        </Card.Text>
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
