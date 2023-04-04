import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
const BlogPost = ({ home }) => {
  const navigate=useNavigate()
  const [posts, setPosts] = useState([])
  let [data,setData]=useState([])
  useEffect(() => {
    const GetDoc=async()=>{
      const querySnapshot = await getDocs(collection (db, "blogpost"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      if(home){
        setPosts(data.slice(0,8))
        return
      }
      setPosts(data)
      setData(data)
  }
  GetDoc()
  }, [])
  const searchBlog=(e)=>{
    const inp=e.target.value;
    if(inp){
    const filterData=posts?.filter((post)=>
     post.title.toLowerCase().includes(inp.toLowerCase())
    )
    setPosts(filterData)
    }
    else{
      setPosts(data)
    }
  }
  return (
    <>
    {!home &&
    <div className="search">
      <input type="search" placeholder='Search here' onChange={searchBlog}/>
    </div>
    }
      <div className="home">
        {
          posts.map((post, index) =>
            <div className="blog-post" key={index}>
              <img src={post?.imgUrl} alt="" className='logo' />
              <div className="posts">
                <h3>{post.title.slice(0,40)}...</h3>
                <p>{post.description.slice(0, 100)}...</p>
                <button onClick={()=>navigate(`/blog/${post.id}`)}>Explore More</button>
              </div>

            </div>
          )
        }
      </div>
    </>
  )
}

export default BlogPost