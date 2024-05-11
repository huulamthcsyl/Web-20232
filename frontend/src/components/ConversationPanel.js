import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { getProfileByUserId } from '../services/API'
import { socket } from '../socket';

export default function ConversationPanel({ conversation, conversations, setConversations }) {

  const [receivedUserProfile, setReceivedUserProfile] = useState();
  const [listMessages, setListMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleCloseMessage = () => {
    setConversations(conversations.filter(msg => msg.receivedUserId !== conversation.receivedUserId));
  }

  // Send message to server
  const handleSendMessage = () => {
    socket.emit('sendMessage', {
      sentUsername: localStorage.getItem('username'),
      sentUserId: localStorage.getItem('userId'),
      receivedUserId: conversation.receivedUserId,
      content: message
    });
    setListMessages([...listMessages, {
      sentUsername: localStorage.getItem('username'),
      sentUserId: localStorage.getItem('userId'),
      receivedUserId: conversation.receivedUserId,
      content: message
    }]);
    setMessage("");
  }

  socket.on('receiveMessage', message => {
    if(message.sentUserId === conversation.receivedUserId) {
      setListMessages([...listMessages, message]);
    }
  })

  useEffect(() => {
    // Fetch user profile from API
    getProfileByUserId(conversation.receivedUserId)
      .then(res => {
        setReceivedUserProfile(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, [conversation])
  

  return (
    <Container className='border p-1 rounded-2 m-0 mb-3 bg-white' style={{width: '300px'}}>
      <Container className='d-flex'>
        <img src={receivedUserProfile?.avatar} alt='avatar' style={{ width: '40px', borderRadius: '50%' }} />
        <h5 className='align-self-center ms-2'>{receivedUserProfile?.firstName + " " + receivedUserProfile?.lastName}</h5>
        <Button variant='danger' className='ms-auto' onClick={handleCloseMessage}>X</Button>
      </Container>
      <Container className='border rounded-2 p-1 mb-2' style={{height: '300px', overflowY: 'scroll'}}>
        {listMessages.map((msg, index) => (
          <Container key={index} className='border rounded-2 p-1 mb-1'>
            <h6>{msg.sentUsername}</h6>
            <p>{msg.content}</p>
          </Container>
        ))}
      </Container>
      <Container className='p-0 d-flex'>
        <input value={message} onChange={e => setMessage(e.target.value)} type='text' className='form-control' onKeyDown={e => {
          if(e.key === 'Enter') handleSendMessage();
        }}/>
        <Button variant='primary' className='mt-2' onClick={handleSendMessage}>Gửi</Button>
      </Container>
    </Container>
  )
}
