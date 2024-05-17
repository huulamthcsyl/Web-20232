import React, { Image, useState, useEffect } from 'react'
import { acceptFriendRequest, declineFriendRequest, getAllFriendRequest, getProfileByUserId } from './services/API'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function FriendRequest() {

  const userId = localStorage.getItem('userId')
  const [friendRequests, setFriendRequests] = useState([])

  useEffect(() => {
    getAllFriendRequest(userId)
      .then(res => {
        setFriendRequests(res.data.id);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  const senders = 0;

  return (
    <Container>
      <div>Friend requests</div>
      <Container className='d-flex'>
        {senders.map((sender) => {
          <Container
            className='p-3 m-3 border rounded shadow-sm position-relative start-50 translate-middle-x d-flex'
            style={{ height: 250, width: 150 }}
          >
            <Link className='p-0 text-decoration-none text-dark' to={`/profile/${sender.id}`}>
              <Image
                className='m-0 p-0 border border-white rounded-top'
                src={sender.avatar}
                style={{ height: 150, width: 150, objectFit: 'cover' }}
              />
              <h5 className='m-1'>{sender.firstName + " " + sender.lastName}</h5>
            </Link>
          </Container>
        })}
      </Container>
    </Container>
  )
}
