import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image } from 'react-bootstrap'
import heart from '../assets/icons/heart.png'
import comment from '../assets/icons/comment.png'
import share from '../assets/icons/share.png'
import { getProfileByUserId } from '../services/API'

export default function Post({ post }) {

  const [name, setName] = useState("");
  const [avatarImgLink, setAvatarImgLink] = useState();
  const [dateCreated, setDateCreated] = useState();

  useEffect(() => {
    getProfileByUserId(post.userId)
    .then(res => {
      setName(res.data.user.firstName + " " + res.data.user.lastName);
      setAvatarImgLink(res.data.user.avatar);
    })
    const fireBaseTime = new Date(
      post.dateCreated.seconds * 1000 + post.dateCreated.nanoseconds / 1000000,
    );
    setDateCreated(fireBaseTime.toLocaleTimeString('vi-VN') + " " + fireBaseTime.toLocaleDateString('vi-VN'))
  }, [post])

  return (
    <Card className='mb-2'>
      <Card.Header>
        <Container className='d-flex justify-content-between p-0'>
          <Col className='d-flex'>
            <img src={avatarImgLink} alt='avatar' style={{width: '40px', borderRadius: '50%' }} />
            <h5 className='align-self-center ms-2'>{name}</h5>
          </Col>
          <Col className='d-flex flex-row-reverse'>
            <p className='align-self-center m-0'>Tạo lúc: {dateCreated}</p>
          </Col>
        </Container>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {post.body}
        </Card.Text>
        <Container className='d-flex justify-content-start mb-2 p-0' style={{overflowX: 'auto'}}>
          {post.image && post.image.map((image, index) => (
            <Image key={index} src={image} style={{ maxWidth: '300px'}} className='me-3 border' />
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
