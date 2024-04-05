import React, { useState } from 'react'
import { Container, Form, Button,Image } from 'react-bootstrap'
import image from '../assets/icons/image.png'
import video from '../assets/icons/video.png'
import { PreviewImage } from '../components/PreviewImage';
import Post from '../components/Post';

function CreatePost() {

  const [selectedImage, setSelectedImage] = useState([])
  const [selectedVideo, setSelectedVideo] = useState();

  // Handle selected image
  const onImageSelected = (e) => {
    setSelectedImage([...selectedImage, ...e.target.files])
  }
  
  const onVideoSelected = (e) => {
    setSelectedVideo(e.target.files[0])
  }

  const handleCreatePost = (e) => {
    e.preventDefault()
  }

  return (
    <Form className='mb-4 border' onSubmit={handleCreatePost}>
      <textarea className="form-control" placeholder="Bạn đang nghĩ gì" style={{ height: "100px", border: 0 }} />
      {selectedImage.length > 0 && 
        <Container className='d-inline-flex justify-content-start p-2' style={{overflowX: 'auto'}}>
          {selectedImage && selectedImage.map((img, index) => (
            <PreviewImage key={index} imageSrc={img} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          ))
          }
        </Container>
      }
      {selectedVideo && 
      <Container style={{position: 'relative'}}>
        <button style={{position:'absolute', top: '-20px',right:'-5px'}} onClick={() => setSelectedVideo(null)} className='btn btn-danger'>X</button>
        <video src={URL.createObjectURL(selectedVideo)} controls width='100%' height='100%' />
      </Container>
      }
      <Container className='p-2 d-flex justify-content-between'>
        <Container className='d-flex'>
          <div className='me-3'>
            <label htmlFor='image-upload' style={{ cursor: 'pointer' }}>
              <Image src={image} />
            </label>
            <input id='image-upload' type='file' style={{ display: 'none' }} accept='image/*' onChange={onImageSelected} multiple/>
          </div>
          <div>
            <label htmlFor='video-upload' style={{ cursor: 'pointer' }}>
              <Image src={video} />
            </label>
            <input id='video-upload' type='file' style={{ display: 'none' }} accept='video/*' onChange={onVideoSelected}/>
          </div>
        </Container>
        <Button type='submit'>Đăng</Button>
      </Container>
    </Form>
  )
}

export default function NewFeeds() {
  return (
    <Container className='w-75'>
      <CreatePost />
      <Post />
    </Container>
  )
}
