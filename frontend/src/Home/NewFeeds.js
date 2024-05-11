import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Post from '../components/Post';
import { CreatePost } from '../components/CreatePost';
import { getAllPost } from '../services/API';
import { socket } from '../socket';

export default function NewFeeds() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getAllPost()
      .then(res => {
        res.data.data.forEach(doc => {
          setPosts(prev => [...prev, {id: doc.id, ...doc.data}])
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Container className='w-75'>
      <CreatePost posts={posts} setPosts={setPosts} />
      {posts.length > 0 && posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Container>
  )
}
