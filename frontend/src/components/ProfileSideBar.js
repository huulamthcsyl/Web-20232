import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import user from '../assets/icons/user.png'
import { Link } from 'react-router-dom'
import { getProfileByUserId } from '../services/API'

function ProfileSideBar() {

  const [profile, setProfile] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    // Fetch user profile from API
    getProfileByUserId(userId)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    profile && <Container className='p-3 m-0 border rounded shadow-sm' style={{ width: "150%" }}>
      <h5> User infomation</h5>
      {profile.description && <p><span className='fw-semibold'>Description: </span>{profile.description}</p>}

      {profile.address && <p><span className='fw-semibold'>Lives in: </span>{profile.address}</p>}

      {profile.DOB && <p><span className='fw-semibold'>Birth date: </span>{profile.DOB}</p>}

      {profile.school && <p><span className='fw-semibold'>Work at: </span>{profile.school} {profile.work && <><span className='fw-semibold'>as </span>{profile.work}</>}</p>}

      {/* <Image className='border' src={profile.avatar} style={{width: '80px'}} roundedCircle />
        <h5 className='align-self-center m-0 ms-2'>{profile.firstName + " " + profile.lastName}</h5> */}

    </Container>
  )
}

export default ProfileSideBar