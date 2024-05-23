import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Post from '../posts/Post';
import { CreatePost } from '../components/CreatePost';
import { getAllPost, getPostByOffset } from '../services/API';
import { socket } from '../socket';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewFeeds() {

  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const handleLoadMore = () => {
    getPostByOffset(posts[posts.length - 1].id, 3)
      .then(res => {
        res.data.posts.forEach(doc => {
          setPosts(prev => [...prev, {id: doc.id, ...doc.data}])
        })
        setHasMore(res.data.hasMore)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getPostByOffset(null, 3)
      .then(res => {
        console.log(res.data)
        res.data.posts.forEach(doc => {
          setPosts(prev => [...prev, {id: doc.id, ...doc.data}])
        })
        setHasMore(res.data.hasMore)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Container className='w-75'>
      <CreatePost posts={posts} setPosts={setPosts} />
      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post, index) => (
          <Post key={index} post={post} posts={posts} setPosts={setPosts} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}
