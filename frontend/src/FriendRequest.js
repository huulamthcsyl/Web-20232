import React, { Image, useState, useEffect } from 'react'
import { acceptFriendRequest, declineFriendRequest, getAllFriendRequest, getProfileByUserId } from './services/API'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

function FriendTile({ friendId, friendRequests, setFriendRequests }){

  const [friendProfile, setFriendProfile] = useState();

  const handleAcceptFriendRequest = (friendId) => {
    acceptFriendRequest({ userId: localStorage.getItem('userId'), friendId: friendId })
    .then(res => {
      console.log("Add")
      toast.success("Thêm bạn mới thành công")
      setFriendRequests(friendRequests.filter(id => id !== friendId))
    })
    .catch(e => {

    })
  }

  const handleDeclineFriendRequest = (friendId) => {
    declineFriendRequest({ userId: localStorage.getItem('userId'), friendId: friendId })
    .then(res => {
      console.log("Remove")
      toast.success("Xoá lời mời kết bạn thành công")
      setFriendRequests(friendRequests.filter(id => id !== friendId))
    })
    .catch(err => {

    })
  }

  useEffect(() => {
    getProfileByUserId(friendId)
    .then(res => {
      setFriendProfile(res.data.user)
    })
    .catch(e => {
      console.log(e)
    })
  }, [friendId])

  return (
    friendProfile && 
    <Container className='p-0 m-0 border me-2' style={{width: 120}}>
      <img src={friendProfile.avatar} style={{width: 120}}/>
      <h5>{friendProfile.firstName + " " + friendProfile.lastName}</h5>
      <Button className='mb-2' onClick={() => handleAcceptFriendRequest(friendId)}>Chấp nhận</Button>
      <Button className='btn-danger' onClick={() => handleDeclineFriendRequest(friendId)}>Từ chối</Button>
    </Container>
  )
}

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


  return (
    <Container>
      <h1>Lời mời kết bạn</h1>
      <Container className='p-0 d-flex'>
        {friendRequests.map((friendId, index) => (
          <FriendTile key={index} friendId={friendId} friendRequests={friendRequests} setFriendRequests={setFriendRequests}/>
        ))}
      </Container>
    </Container>
  )
}
