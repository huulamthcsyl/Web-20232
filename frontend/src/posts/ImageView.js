import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/API';

export default function ImageView() {

  const [post, setPost] = useState();
  const { postId, imagePosition } = useParams();

  useEffect(() => {
    getPostById(postId)
      .then(res => {
        setPost(res.data.data[0])
        // console.log(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [postId, imagePosition])

  return (
    <Container fluid>
      <Container className='p-0 bg-dark'>
        {post && <Image src={post.image[imagePosition]} alt={post.image[imagePosition]} />}
      </Container>
      <Container>
        Test
      </Container>
    </Container >
  )
}
