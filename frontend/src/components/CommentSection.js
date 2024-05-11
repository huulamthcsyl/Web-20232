import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { getCommentByPostId, getPostById } from '../services/API'
import Comment from './Comment'
import Post from './Post'
import { socket } from '../socket'

export default function CommentSection({ postId }) {

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    setComments([])
    getCommentByPostId(postId)
      .then(res => {
        res.data.data.forEach(doc => {
          getPostById(doc)
            .then(res => {
              setComments(prev => [...prev, {post: {...res.data.data, id: doc}}])
            })
            .catch(error => {
              console.log(error)
            })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [postId])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('createComment', {
      nameUserComment: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      postId: postId,
      content: newComment
    })
    setNewComment('')
  }

  return (
    <Container className='p-0'>
      <Form className='d-flex mb-2' onSubmit={handleSubmit}>
        <Form.Group className='me-2' style={{ width: '100%' }}>
          <Form.Control type='text' placeholder='Viết comment...' value={newComment} onChange={e => setNewComment(e.target.value)}/>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Gửi
        </Button>
      </Form>
      <Container className='p-0'>
        {comments.map((comment, index) => (
          <Post key={index} post={comment.post} />
        ))}
      </Container>
    </Container>
  )
}
