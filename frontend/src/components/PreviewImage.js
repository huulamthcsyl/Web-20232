import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';

export function PreviewImage({ imageSrc, selectedImage, setSelectedImage }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    setImageURL(URL.createObjectURL(imageSrc));
  }, [selectedImage]);

  const handleRemoveImage = () => {
    const newImages = selectedImage.filter((image) => image !== imageSrc);
    setSelectedImage(newImages);
  };

  return (
    <Container className='me-3' style={{ display: 'inline', position: 'relative', width: 'auto' }}>
      <Button variant='danger' style={{ position: 'absolute', right: '-10px', top: '-60px' }} onClick={handleRemoveImage}>X</Button>
      <img src={imageURL} style={{ width: '100px' }} />
    </Container>
  );
}
