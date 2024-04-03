import React from 'react'
import { Container, Col, Row, Form, Button, Image, Text, Stack, Tab, Tabs, NavLink } from 'react-bootstrap'
import camera from './assets/icons/camera.png'
import cover from './assets/icons/user.png'
import avatar from './assets/icons/user.png'
import NewFeeds from './Home/NewFeeds'
import { Link } from 'react-router-dom'


export default function Profile() {
  return (
    <Container className='p-0 row' fluid>
      <Container className='p-0' style={{ width: 1000, textAlign: 'center', position: 'relative' }} fluid>
        <Image
          className='rounded-bottom'
          src={cover}
          style={{ width: 1000, height: 350, objectFit: 'cover' }}
          fluid
        />
        <Button variant='light' style={{ position: 'absolute', bottom: 10, right: 20 }}>
          <Image src={camera} style={{ width: 20, marginRight: 10 }}></Image>
          Edit cover photo
        </Button>
      </Container>
      <Container className='d-flex mt-3' style={{ width: 1000, position: 'relative' }} fluid>
        <Image
          className='border border-5 border-white rounded-circle'
          src={avatar}
          style={{ width: 200, height: 200, position: 'relative', top: -100, left: 30, objectFit: 'cover' }}
        />
        <Container className='row'>
          <p className='ps-5' style={{ fontSize: 33, fontWeight: 'bold' }}>Nguyễn Văn A</p>
          <NavLink className='ps-5' as={Link} to="/friends" >??? friends</NavLink>
        </Container>
      </Container>
      <Container style={{ width: 1000 }}>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="posts" title="Posts">
            <Row>
              <Col>
              </Col>
              <Col style={{width: '75%'}}>
                <NewFeeds />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="about" title="About">
          </Tab>
          <Tab eventKey="friends" title="Friends">
          </Tab>
          <Tab eventKey="media" title="Media">
          </Tab>
        </Tabs>
      </Container>
    </Container>
  )
}
