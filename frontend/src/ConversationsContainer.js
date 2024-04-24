import React from 'react'
import { Container } from 'react-bootstrap'
import ConversationPanel from './components/ConversationPanel'

export default function ConversationsContainer({ conversations, setConversations}) {

  return (
    <Container fluid className='fixed-bottom m-0 d-flex flex-row-reverse pe-4' style={{left: '0px'}}>
      {conversations.map((conversation, index) => (
        <ConversationPanel key={index} conversation={conversation} conversations={conversations} setConversations={setConversations} />
      ))}
    </Container>
  )
}
