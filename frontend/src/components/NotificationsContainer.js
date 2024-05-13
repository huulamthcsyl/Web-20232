import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getNotificationByUserId, getProfileByUserId } from '../services/API'

function NotificationTile({ notification }) {

	const [profileUser, setProfileUser] = useState()

	useEffect(() => {
		getProfileByUserId(notification.userId)
			.then(res => {
				setProfileUser(res.data.user)
			})
			.catch(err => {
				console.log(err)
			})
	}, [notification])

	return (
		<Link to={`/post/${notification.postId}`} style={{textDecoration: 'none', color: 'black'}}>
			<Container className='p-0 d-flex'>
				<img className='border me-2 mb-2' src={profileUser?.avatar} alt={profileUser?.username} style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover'}} />
				<p>{notification.sentUsername} đã {notification.type === "like" ? "thích" : "bình luận"} bài viết của bạn</p>
			</Container>
		</Link>
	)
}

export default function NotificationsContainer() {

	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		getNotificationByUserId(localStorage.getItem('userId'))
			.then(res => {
				setNotifications(res.data.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

  return (
    <Container className='border rounded z-1' style={{position: "fixed", top: '70px', right: '10px', width: '300px', backgroundColor: '#fff'}}>
			<h3>Thông báo</h3>
			{notifications.map((notification, index) => (
				<NotificationTile key={index} notification={notification} />
			))}
    </Container>
  )
}
