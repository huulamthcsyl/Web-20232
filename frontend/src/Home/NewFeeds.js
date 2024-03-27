import React, { useEffect, useState } from 'react'
import { Container, Form, Button,Image } from 'react-bootstrap'
import image from '../assets/icons/image.png'

function CreatePost() {

  const [selectedImage, setSelectedImage] = useState([])
  const [selectedImageURL, setSelectedImageURL] = useState([]);

  // Handle selected image
  const onImageSelected = (e) => {
    setSelectedImage([...selectedImage, ...e.target.files])
  }

  // Create URL for selected image
  useEffect(() => {
    if(selectedImage.length < 1) return;
    const newImageUrls = [];
    selectedImage.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setSelectedImageURL(newImageUrls);
  }, [selectedImage])
  

  const handleCreatePost = (e) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleCreatePost}>
      <textarea class="form-control" placeholder="Bạn đang nghĩ gì" style={{ height: "100px", border: 0 }} />
      {selectedImageURL.length > 0 && selectedImageURL.map((img, index) => (
        <Image className='me-4' key={index} src={img} style={{width: '100px'}} />
      ))}
      <Container className='p-2 d-flex justify-content-between'>
        <div>
          <label htmlFor='file-upload' style={{ cursor: 'pointer' }}>
            <Image src={image} />
          </label>
          <input id='file-upload' type='file' style={{ display: 'none' }} accept='image/*, video/*' onChange={onImageSelected} multiple/>
        </div>
        <Button type='submit'>Đăng</Button>
      </Container>
    </Form>
  )
}

export default function NewFeeds() {
  return (
    <Container>
      <CreatePost />
    </Container>
  )
}
