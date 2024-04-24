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
    socket.connect();
  }, []);

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
