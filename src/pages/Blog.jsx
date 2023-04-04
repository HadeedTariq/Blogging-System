import { useParams } from 'react-router-dom'
import '../css/Blog.css'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Blog = () => {
  const { id } = useParams()
  const [postDetails,setPostDetails]=useState({});
  useEffect(() => {
    const getDetails=async()=>{
    const docRef = doc(db, "blogpost", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPostDetails(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  getDetails()
  }, [id])
  return (
    <>
      {postDetails &&
        <div className="blog-detail">
        <img src={postDetails.imgUrl} alt="" />
        <h1>{postDetails.title}</h1>
        <h3>{postDetails.description}</h3>
      </div>
    }
    </>
  )
}

export default Blog