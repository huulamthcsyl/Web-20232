import React, { createContext, useContext, useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import ProfileCard from './components/ProfileCard'
import { Container } from 'react-bootstrap'
import FriendList from './components/FriendList'
import ConversationsContainer from './ConversationsContainer'
import { socket } from './socket'

export default function Layout() {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    Notification.requestPermission();
    // Configure socket.io connection
    socket.io.opts.query = {
      userId: localStorage.getItem('userId')
    }
    socket.connect();
    socket.on('likePost', data => {
      const { nameUserLike } = data
      new Notification(`${nameUserLike} đã thích bài viết của bạn`)
    })
    socket.on('receiveMessage', data => {
      const { content, sentUsername } = data
      new Notification(`Bạn có tin nhắn mới từ ${sentUsername}`, {
        body: content
      })
    })
    socket.on('createComment', data => {
      const { nameUserComment } = data
      new Notification(`${nameUserComment} đã bình luận bài viết của bạn`)
    })
    return () => {
      socket.off('likePost')
      socket.off('receiveMessage')
    }
  }, [socket])

  return (
    <Container fluid className='p-0 position-relative'>
      <NavBar />
      <Container className='p-0 pt-2 position-relative' fluid>
        <Container className='p-0 position-fixed' style={{ width: '20%', top: '75px', left: '0px' }}>
          <ProfileCard />
        </Container>
        <Container className='p-0' style={{ width: '60%' }}>
          <Outlet />
        </Container>
        <Container className='p-0 position-fixed' style={{ width: '20%', top: '75px', right: '0px' }}>
          <FriendList conversations={conversations} setConversations={setConversations} />
        </Container>
      </Container>
      <ConversationsContainer conversations={conversations} setConversations={setConversations}/>
    </Container>
  )
}
