import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getProfileByUserId } from '../services/API';

export function ConversationTile({ conversation, conversations, setConversations }) {

  const [userProfile, setUserProfile] = useState();

  const handleNewConversation = (receivedUserId) => {
    // Check if conversation already exists
    if (conversations.find(conversation => conversation.receivedUserId === receivedUserId)) return;

    // Add new message to the message container
    setConversations([...conversations, {
      sentUserId: localStorage.getItem('userId'),
      receivedUserId: receivedUserId,
      message: []
    }]);
  };

  useEffect(() => {
    getProfileByUserId(conversation.lastMessage.sentUserId)
      .then(res => {
        setUserProfile(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, [conversation.sentUserId]);

  return (
    userProfile && <Container className='d-flex p-0' onClick={() => handleNewConversation(conversation.lastMessage.sentUserId)}>
      <img src={userProfile?.avatar} alt={userProfile?.username} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
      <Container className='d-flex'>
        <Container className='p-0'>
          <h5>{conversation.lastMessage.sentUsername}</h5>
          <p>{conversation.lastMessage.content}</p>
        </Container>
        {!conversation.lastMessage.isRead && <Container className='bg-primary text-white rounded-2 p-1 align-self-center' style={{width: '10px', height: '10px'}}></Container>}
      </Container>
    </Container>
  );
}
