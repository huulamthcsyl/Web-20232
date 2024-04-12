import React, { useEffect, useState } from 'react'
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getPostById, getProfileByUserId } from '../services/API';
import heart from '../assets/icons/heart.png'
import comment from '../assets/icons/comment.png'
import share from '../assets/icons/share.png'

export default function DetailPost() {

  const { id } = useParams()
  const [post, setPost] = useState();
  const [name, setName] = useState("");
  const [avatarImgLink, setAvatarImgLink] = useState();
  const [dateCreated, setDateCreated] = useState();

  let getUserInfo = (post) => {
    getProfileByUserId(post.userId)
      .then(res => {
        setName(res.data.user.firstName + " " + res.data.user.lastName);
        setAvatarImgLink(res.data.user.avatar);
      })
      const fireBaseTime = new Date(
        post.dateCreated.seconds * 1000 + post.dateCreated.nanoseconds / 1000000,
      );
    setDateCreated(fireBaseTime.toLocaleTimeString('vi-VN') + " " + fireBaseTime.toLocaleDateString('vi-VN'))
  }

  useEffect(() => {
    // Fetch post by id
    getPostById(id)
      .then(res => {
        setPost(res.data.data[0]);
        getUserInfo(res.data.data[0]);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    post && 
    <Container className='w-75'>
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
              <Link to={`image/${index}`}>
                <Image key={index} src={image} style={{ maxWidth: '300px'}} className='me-3 border' />
              </Link>
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
    </Container>
  )
}
