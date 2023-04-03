import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
const BlogPost = ({ home }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    let data=[]
    const GetDoc=async()=>{
      const querySnapshot = await getDocs(collection (db, "blogpost"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      if(home){
        data=data.slice(0,8)
      }
      setPosts(data)
  }
  GetDoc()
  }, [])
  return (
    <>
      <div className="home">
        {
          posts.map((post, index) =>
            <div className="blog-post" key={index}>
              <img src={post?.imgUrl} alt="" className='logo' />
              <div className="posts">
                <h3>{post.title.slice(0,40)}...</h3>
                <p>{post.description.slice(0, 100)}...</p>
                <button>Explore More</button>
              </div>

            </div>
          )
        }
      </div>
    </>
  )
}

export default BlogPost