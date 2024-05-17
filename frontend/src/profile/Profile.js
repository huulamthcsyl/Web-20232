import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Image, Tab, Tabs, NavLink } from 'react-bootstrap'
import NewFeeds from '../Home/NewFeeds'
import { Link, useParams } from 'react-router-dom'
import ProfileSideBar from '../components/ProfileSideBar';
import UpdateProfile from './UpdateProfile';
import { createFriendRequest, getProfileByUserId } from '../services/API'
import add_friend from '../assets/icons/add_friend.png'


export default function Profile() {

  const [profile, setProfile] = useState()
  const { id } = useParams()

  useEffect(() => {
    // const userId = localStorage.getItem('userId')
    // Fetch user profile from API
    getProfileByUserId(id)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    profile && <Container className='p-0 row' fluid>
      <Container className='p-0' style={{ width: 1000, textAlign: 'center', position: 'relative' }} fluid>
        <Image
          className='rounded-bottom'
          src={profile.cover}
          style={{ width: 1000, height: 350, objectFit: 'cover' }}
          fluid
        />
        {id == localStorage.getItem('userId') ?
          <UpdateProfile /> :
          <Button
            variant='primary'
            style={{ position: 'absolute', bottom: 10, right: 20 }}
            onClick={() => { createFriendRequest({ userId: localStorage.getItem('userId'), friendId: id }) }}
          >
            <Image src={add_friend} style={{ width: 20, marginRight: 10 }}></Image>
            Kết bạn
          </Button>}
      </Container>
      <Container className='d-flex mt-3' style={{ width: 1000, position: 'relative' }} fluid>
        <Image
          className='border border-5 border-white rounded-circle'
          src={profile.avatar}
          style={{ width: 200, height: 200, position: 'relative', top: -100, left: 30, objectFit: 'cover' }}
        />
        <Container >
          <p className='ps-5' style={{ fontSize: 33, fontWeight: 'bold' }}>{profile.firstName + " " + profile.lastName}</p>
          {/* <NavLink className='ps-5' as='a' to="/friends" >??? friends</NavLink> */}
        </Container>
      </Container>
      <Container style={{ width: 1000 }}>
        <Row>
          <Col className='m-0 w-25'>
            <ProfileSideBar userId={id} />
          </Col>
          <Col className='w-75'>
            <NewFeeds />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}