import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPostById, getProfileByUserId } from '../services/API';
import heart from '../assets/icons/heart.png'
import comment from '../assets/icons/comment.png'
import share from '../assets/icons/share.png'
import prevArrow from '../assets/icons/prev-arrow.png'
import nextArrow from '../assets/icons/next-arrow.png'

export default function ImageView() {

  const [post, setPost] = useState();
  const [userInfo, setUserInfo] = useState();
  const { postId } = useParams();
  let location = useLocation();
  const [imagePosition, setImagePosition] = useState();
  const navigate = useNavigate();

  const handlePreviousImage = () => {
    setImagePosition(Math.max(0, Number(imagePosition) - 1));
  }

  const handleNextImage = () => {
    setImagePosition(Math.min(post.image.length - 1, Number(imagePosition) + 1));
  }

  useEffect(() => {
    setImagePosition(location.state.imagePosition);
    getPostById(postId)
      .then(res => {
        setPost(res.data.data)
        getProfileByUserId(res.data.data.userId)
          .then(res => {
            setUserInfo(res.data.user)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }, [postId])

  return (
    post &&
    <Container fluid className='p-0 m-0 position-relative' style={{height: '100vh'}}>
      <Container className='bg-dark d-flex justify-content-between p-0 position-fixed' style={{width: '70%', height:'100%'}}>
        <Button className='bg-dark text-white border-0 text-decoration-none' style={{position: 'absolute', top: '10px', width: '10px', left: '10px'}} onClick={() => navigate(-1)}>
          X
        </Button>
        <Button className='p-0 border-0 align-self-center ms-3 btn-light' style={{width: '30px'}} onClick={handlePreviousImage}>
          <Image src={prevArrow} />
        </Button>
        <Image className='object-fit-scale' src={post.image[imagePosition]} style={{maxHeight: '100vh', maxWidth: '90%'}}/>
        <Button className='p-0 border-0 align-self-center me-2 btn-light' style={{width: '30px'}} onClick={handleNextImage}>
          <Image src={nextArrow} />
        </Button>
      </Container>
      <Container className='p-2 position-absolute top-0 end-0' style={{width: '30%'}}>
        <Container>
          { userInfo &&
            <Container className='d-flex p-0 mb-2'>
              <Image className='me-2' style={{width: '50px'}} src={userInfo.avatar} roundedCircle />
              <h3>{userInfo.firstName} {userInfo.lastName}</h3>
            </Container>
          }
          <Container className='p-0'>
            {post.body}
          </Container>
          {post.dateCreated && 
            <p className='text-secondary'>{new Date(post.dateCreated.seconds * 1000).toLocaleString()}</p>
          }
          <Container className='d-flex justify-content-between p-0'>
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
        </Container>
      </Container>
    </Container>
  )
}